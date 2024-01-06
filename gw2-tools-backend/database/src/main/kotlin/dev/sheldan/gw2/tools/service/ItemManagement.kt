package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.Item
import dev.sheldan.gw2.tools.repo.ItemRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class ItemManagement(val itemRepository: ItemRepository) {
    fun getItems(itemIds: List<Int>) : List<Item> {
        return itemRepository.findAllById(itemIds).toList()
    }

    fun getItem(itemId: Int) : Item? {
        return itemRepository.findByIdOrNull(itemId)
    }

    fun getItemsAsMap(itemIds: List<Int>) : Map<Int, Item> {
        return getItems(itemIds).associateBy { it.id }
    }

    fun getItems() : List<Item> {
        return itemRepository.findAll().toList()
    }

    fun createItem(id: Int, name: String, description: String, iconUrl: String, type: String, rarity: String): Item {
        return Item(name, description, iconUrl, type, rarity, null, null, id)
    }

    fun createAndSaveItem(id: Int, name: String, description: String, iconUrl: String, type: String, rarity: String): Item {
        val item = createItem(id, name, description, iconUrl, type, rarity)
        return saveItem(item)
    }

    fun saveItems(items: List<Item>) {
        itemRepository.saveAll(items)
    }

    fun saveItem(item: Item): Item {
        return itemRepository.save(item)
    }
}