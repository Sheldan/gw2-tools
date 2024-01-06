package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.loader.CurrencyLoader
import dev.sheldan.gw2.tools.loader.ItemLoader
import mu.KotlinLogging
import org.springframework.stereotype.Component

@Component
class CacheService(
    val itemLoader: ItemLoader,
    val itemManagement: ItemManagement,
    val currencyLoader: CurrencyLoader,
    val currencyManagement: CurrencyManagement
) {

    private val logger = KotlinLogging.logger {}
    fun reloadItemCache() {
        val allItemsApi = itemLoader.getAllItems().associateBy { it.id }
        logger.info { "Loaded ${allItemsApi.size} items from API" }
        val allItemsDb = itemManagement.getItems().associateBy { it.id }
        logger.info { "Loaded ${allItemsDb.size} items from DB" }
        val missingItems = allItemsApi.keys.minus(allItemsDb.keys)
        val newDbItems = missingItems.mapNotNull { itemId ->
            val item = allItemsApi[itemId]
            item?.let {
                itemManagement.createItem(
                    it.id,
                    item.name!!,
                    item.description!!,
                    item.iconUrl!!,
                    it.type!!.name,
                    item.rarity!!.name
                )
            }
        }.toList()
        logger.info { "Creating ${newDbItems.size} new items" }
        itemManagement.saveItems(newDbItems)

    }

    fun reloadCurrencyCache() {
        val allCurrenciesApi = currencyLoader.getAllCurrencies().associateBy { it.id }
        logger.info { "Loaded ${allCurrenciesApi.size} currencies from API" }
        val allCurrenciesDb = currencyManagement.getCurrencies().associateBy { it.id }
        logger.info { "Loaded ${allCurrenciesDb.size} currencies from DB" }
        val missingCurrencies = allCurrenciesApi.keys.minus(allCurrenciesDb.keys)
        val newDbCurrencies = missingCurrencies.mapNotNull {
                itemId ->
            val item = allCurrenciesApi[itemId]
            item?.let {
                currencyManagement.createCurrency(
                    it.id,
                    item.name,
                    item.description,
                    item.iconUrl
                )
            }
        }
        logger.info { "Creating ${newDbCurrencies.size} new items" }
        currencyManagement.saveCurrencies(newDbCurrencies)
    }
}