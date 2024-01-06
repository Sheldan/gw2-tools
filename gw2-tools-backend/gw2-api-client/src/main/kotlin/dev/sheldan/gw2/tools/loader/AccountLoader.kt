package dev.sheldan.gw2.tools.loader

import dev.sheldan.gw2.tools.models.*
import dev.sheldan.gw2.tools.service.ItemManagement
import io.github.kryszak.gwatlin.api.account.GWAccountClient
import io.github.kryszak.gwatlin.api.characters.GWCharactersClient
import io.github.kryszak.gwatlin.api.miscellaneous.GWMiscellaneousClient
import org.springframework.stereotype.Component
import org.springframework.web.context.annotation.RequestScope

@Component
@RequestScope
class AccountLoader(
    val charClient: GWCharactersClient,
    val accountClient: GWAccountClient,
    val miscellaneousClient: GWMiscellaneousClient,
    val itemManagement: ItemManagement
) {
    fun getCharacters(): List<String>? {
        return charClient.getCharacters()
    }

    fun getWallet(): AccountWalletView {
        val wallet = accountClient.getWallet()
        val currencies = miscellaneousClient.getCurrencies().associateBy { it.id }
        val enrichedCurrencies = wallet.mapNotNull { walletCurrency ->
            val currency = currencies[walletCurrency.id]
            currency?.let {
                EnrichedCurrency(walletCurrency.id, walletCurrency.value, it.name, it.description, it.icon)
            }
        }
        return AccountWalletView(enrichedCurrencies)
    }

    fun getBank(): AccountVaultView {
        val bank = accountClient.getAccountVault()
        val itemIds = mutableSetOf<Int>()
        val items = bank.filterNotNull().mapNotNull {
            itemIds.add(it.id)
            EnrichedItem(it.id, it.count, it.boundTo)
        }
        val itemStats = itemManagement.getItemsAsMap(itemIds.toList())
        items.forEach { item ->
            itemStats[item.id]?.let {
                item.setValuesFromDbItem(it)
            }
        }
        return AccountVaultView(items)
    }

    fun getMaterials(): AccountMaterialView{
        val materials = accountClient.getMaterials()
        val itemIds = mutableSetOf<Int>()
        val items = materials
            .filter { it.count > 0 }
            .map {

            itemIds.add(it.id)
            EnrichedItem(it.id, it.count)
        }
        val actualMaterials = itemManagement.getItemsAsMap(itemIds.toList())
        items.forEach { item ->
            actualMaterials[item.id]?.let {
                item.setValuesFromDbItem(it)
            }
        }
        return AccountMaterialView(items)
    }
}