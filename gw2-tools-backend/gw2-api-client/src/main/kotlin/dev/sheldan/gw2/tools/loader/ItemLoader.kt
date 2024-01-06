package dev.sheldan.gw2.tools.loader

import dev.sheldan.gw2.tools.models.EnrichedItem
import io.github.kryszak.gwatlin.api.items.GWItemsClient
import org.springframework.stereotype.Component

@Component
class ItemLoader(
    val itemClient: GWItemsClient
) {
    fun getAllItems(): List<EnrichedItem> {
        return itemClient.getItemIds().chunked(200)
            .flatMap { (itemClient.getItems(it)) }
            .map {
                val item = EnrichedItem(it.id, 1)
                item.setValuesFromItem(it)
                item
            }
    }
}