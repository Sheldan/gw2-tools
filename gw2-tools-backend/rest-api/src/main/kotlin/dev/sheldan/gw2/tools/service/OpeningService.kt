package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.Currency
import dev.sheldan.gw2.tools.entity.Item
import dev.sheldan.gw2.tools.entity.Opening
import dev.sheldan.gw2.tools.entity.OpeningItem
import dev.sheldan.gw2.tools.model.*
import dev.sheldan.gw2.tools.models.EnrichedCurrency
import dev.sheldan.gw2.tools.models.EnrichedItem
import dev.sheldan.gw2.tools.models.Gw2TItemType
import org.springframework.stereotype.Component

@Component
class OpeningService(
    val userManagement: UserManagement,
    val openingManagement: OpeningManagement,
    val itemManagement: ItemManagement,
    val currencyManagement: CurrencyManagement
) {
    fun createOpening(openingRequest: OpeningRequest, token: String) {
        val user = userManagement.getOrCreateUser(token)
        val itemsWithIds = openingRequest.items.filter { it.itemType == OpeningItemType.ITEM }.associateBy { it.itemId }
        val fullItems =
            itemManagement.getItems(itemsWithIds.keys.toList()).associateWith { itemsWithIds[it.id]!!.change }
        val currenciesWithIds =
            openingRequest.items.filter { it.itemType == OpeningItemType.CURRENCY }.associateBy { it.itemId }
        val fullCurrencies = currencyManagement.getCurrencies(currenciesWithIds.keys.toList())
            .associateWith { currenciesWithIds[it.id]!!.change }
        openingManagement.createOpening(user, fullItems, fullCurrencies, openingRequest.description)
    }

    fun loadOpenings(token: String?, ownOnly: Boolean): OpeningsView {
        val openings: List<Opening>;
        if (ownOnly && token != null) {
            val user = userManagement.getOrCreateUser(token)
            openings = openingManagement.getOpeningsByUser(user)
        } else {
            openings = openingManagement.getAllOpenings()
        }
        val items = openings.filter { it.items != null }.flatMap { it.items!! }
        val itemIds = items.map { it.item.id }
        val loadedItemsMap = itemManagement.getItemsAsMap(itemIds)
        val currencies = openings.filter { it.currencies != null }.flatMap { it.currencies!! }
        val currencyIds = currencies.map { it.currency.id }
        val loadedCurrenciesMapMap = currencyManagement.getCurrenciesAsMap(currencyIds)
        val openingViews = openings.map { convertOpening(it, loadedItemsMap, loadedCurrenciesMapMap) }
        return OpeningsView(openingViews)
    }

    fun deleteOpening(token: String, openingId: Int) {
        val user = userManagement.getOrCreateUser(token)
        val opening = openingManagement.getOpening(openingId)
        opening.map {
            if (user.id == it.user.id) {
                openingManagement.deleteOpening(it)
            }
        }
    }

    fun convertOpening(opening: Opening, itemMap: Map<Int, Item>, currencyMap: Map<Int, Currency>): OpeningView {
        val items = mutableListOf<EnrichedItem>()
        opening.items?.mapNotNull {
            val enrichedItem = EnrichedItem(it.item.id, it.count)
            itemMap[it.item.id]?.let { item ->
                enrichedItem.setValuesFromDbItem(item)
                return@mapNotNull enrichedItem
            }
        }?.let { items.addAll(it) }
        val currencies = mutableListOf<EnrichedCurrency>()
        opening.currencies?.mapNotNull {
            currencyMap[it.currency.id]?.let { currency ->
                EnrichedCurrency(currency.id, it.amount, currency.name, currency.description, currency.iconUrl)
            }
        }?.let { currencies.addAll(it) }
        return OpeningView(items, currencies, opening.id!!, opening.description, opening.creationDate!!)
    }

    fun loadItemRates(): ItemRates {
        val openings = openingManagement.getAllOpenings()
        val presentItems = openings.filter { it.items != null }.flatMap { it.items!! }.map { it.item }
        val presentCurrencies = openings.filter { it.currencies != null }.flatMap { it.currencies!! }.map { it.currency }
        val itemIds = presentItems.map { it.id }
        val currencyIds = presentCurrencies.map { it.id }
        val loadedItemsMap = itemManagement.getItemsAsMap(itemIds)
        val loadedCurrenciesMap = currencyManagement.getCurrenciesAsMap(currencyIds)
        val allItems = openings.mapNotNull { opening ->
            val containers = getListOfContainersFromOpening(opening)
            if(containers.size == 1) {
                val containerOpeningItem = containers[0]
                val enrichedContainerItem = EnrichedItem(containerOpeningItem.item.id, containerOpeningItem.count)
                loadedItemsMap[containerOpeningItem.item.id]?.let { item ->
                    enrichedContainerItem.setValuesFromDbItem(item)
                }
                val resultingItems = opening.items?.filter { it.count > 0 }?.mapNotNull itemMap@ {
                    val enrichedItem = EnrichedItem(it.item.id, it.count)
                    loadedItemsMap[it.item.id]?.let { item ->
                        enrichedItem.setValuesFromDbItem(item)
                        return@itemMap enrichedItem
                    }
                }?: listOf()
                val resultingCurrencies = opening.currencies?.filter { it.amount > 0 }?.mapNotNull currencyMap@ {
                    loadedCurrenciesMap[it.currency.id]?.let { currency ->
                        val enrichedCurrency = EnrichedCurrency(it.currency.id, it.amount, currency.name, currency.description, currency.iconUrl)
                        return@currencyMap enrichedCurrency
                    }
                }?: listOf()
                return@mapNotNull ItemRate(enrichedContainerItem, resultingItems, resultingCurrencies)
            } else {
                null
            }
        }
        val itemRateMap = mutableMapOf<Int, ItemRate>()
        allItems.forEach{ item ->
            itemRateMap[item.item.id]?.let { itemRate ->
                val existingEnrichedItems = itemRate.receivedItems.associateBy { receivedItem -> receivedItem.id }
                item.receivedItems.forEach{receivedItem ->
                    existingEnrichedItems[receivedItem.id]?.let{
                        it.count += receivedItem.count
                    }?: itemRate.receivedItems.addLast(receivedItem)
                }
                val existingEnrichedCurrencies = itemRate.receivedCurrencies.associateBy { receivedCurrency -> receivedCurrency.id }
                item.receivedCurrencies.forEach{receivedCurrency ->
                    existingEnrichedCurrencies[receivedCurrency.id]?.let{
                        it.amount += receivedCurrency.amount
                    }?: itemRate.receivedCurrencies.addLast(receivedCurrency)
                }
                itemRate.item.count += item.item.count
            }?: itemRateMap.put(item.item.id, item)
        }
        return ItemRates(itemRateMap.values.toList())
    }

    private fun getListOfContainersFromOpening(opening: Opening): List<OpeningItem> {
        return opening.items?.filter { item -> item.count < 0 && item.item.type == Gw2TItemType.CONTAINER.name } ?: listOf()
    }

}

