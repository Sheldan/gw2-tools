package dev.sheldan.gw2.tools.loader

import dev.sheldan.gw2.tools.entity.Item
import dev.sheldan.gw2.tools.models.*
import dev.sheldan.gw2.tools.service.ItemManagement
import io.github.kryszak.gwatlin.api.account.GWAccountClient
import io.github.kryszak.gwatlin.api.account.model.InventoryItem
import io.github.kryszak.gwatlin.api.characters.GWCharactersClient
import io.github.kryszak.gwatlin.api.characters.model.character.inventory.Bag
import io.github.kryszak.gwatlin.api.characters.model.character.inventory.InventorySlot
import org.springframework.stereotype.Component
import org.springframework.web.context.annotation.RequestScope

@Component
@RequestScope
class InventoryLoader(
    val charClient: GWCharactersClient,
    val accountClient: GWAccountClient,
    val itemManagement: ItemManagement
) {

    fun getInventory(characterName: String): List<Bag?>? {
        return charClient.getInventory(characterName)
    }

    fun getFullCharacterInventory(characterName: String): CharacterInventory {
        val itemIds = mutableSetOf<Int>()
        val characterInventory = getCharacterInventory(characterName, itemIds)
        val itemStats = getFullItemInfos(itemIds)
        enrichCharacterInventory(characterInventory, itemStats)
        return characterInventory
    }

    private fun getCharacterInventory(characterName: String, itemIds: MutableSet<Int>): CharacterInventory {
        val characterInventory = getInventory(characterName)
        val convertedBags = mutableListOf<InventoryBag>()
        characterInventory?.let {
            for (bag in characterInventory.filterNotNull()) {
                convertedBags.addLast(convertApiBagToCharacterInventory(bag, itemIds))
            }
        }
        return CharacterInventory(characterName, convertedBags)
    }

    fun getAccountInventory(): AccountInventoryView {
        val characters = charClient.getCharacters()
        val itemIds = mutableSetOf<Int>()
        val inventories = mutableListOf<CharacterInventory>()
        for (characterName in characters) {
            inventories.addLast(getCharacterInventory(characterName, itemIds))
        }

        val itemStats = getFullItemInfos(itemIds)
        inventories.forEach { enrichCharacterInventory(it, itemStats) }
        return AccountInventoryView(inventories)
    }

    private fun enrichCharacterInventory(characterInventory: CharacterInventory, itemStats: Map<Int, Item>) {
        return characterInventory.bags.forEach { bag ->
                bag.items.forEach { item ->
                    itemStats[item.id]?.let {
                        item.setValuesFromDbItem(it)
                    }
                }
            }
        }

    private fun convertApiBagToCharacterInventory(bag: Bag, itemIds: MutableSet<Int>): InventoryBag {
        val items = bag.inventory.filterNotNull().map { convertInventorySlot(it, itemIds) }
        return InventoryBag(bag.id, bag.size, items)
    }

    private fun convertInventorySlot(slot: InventorySlot, itemIds: MutableSet<Int>): EnrichedItem {
        itemIds.add(slot.id)
        return EnrichedItem(slot.id, slot.count, slot.boundTo)
    }

    private fun convertInventoryItem(item: InventoryItem, itemIds: MutableSet<Int>): EnrichedItem {
        itemIds.add(item.id)
        return EnrichedItem(item.id, item.count, item.binding)
    }

    fun getSharedInventory(): AccountInventory {
        val itemIds = mutableSetOf<Int>()
        val sharedInventorySlots = accountClient.getInventory().filterNotNull()
        val sharedItems = sharedInventorySlots.map { convertInventoryItem(it, itemIds) }
        val fullItemInfo = getFullItemInfos(itemIds)
        sharedItems.forEach { item ->
            fullItemInfo[item.id]?.let {
                item.setValuesFromDbItem(it)
            }
        }
        return AccountInventory(sharedItems)
    }

    private fun getFullItemInfos(itemIds: MutableSet<Int>) = itemManagement.getItemsAsMap(itemIds.toList())

}