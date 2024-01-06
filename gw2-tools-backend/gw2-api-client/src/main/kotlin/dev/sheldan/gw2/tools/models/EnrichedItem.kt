package dev.sheldan.gw2.tools.models

import io.github.kryszak.gwatlin.api.items.model.item.Item

data class EnrichedItem(
    val id: Int,
    var count: Int,
    val boundTo: String? = null,

    var iconUrl: String? = null,
    var name: String? = null,
    var description: String? = null,
    var type: Gw2TItemType? = null,
    var level: Int? = null,
    var rarity: Gw2TItemRarity? = null
) {
    fun setValuesFromItem(item: Item) {
        this.name = item.name
        this.level = item.level
        this.description = item.description
        this.type = Gw2TItemType.convertFromAPI(item.type)
        this.rarity = Gw2TItemRarity.convertFromAPI(item.rarity)
        this.iconUrl = item.icon.ifBlank { "https://render.guildwars2.com/file/4BC52199DBDEEF5D4D90736B582DDA0F092B0DE4/434780.png" } // default icon if nothing is shown
    }

    fun setValuesFromDbItem(item: dev.sheldan.gw2.tools.entity.Item) {
        this.name = item.name
        this.description = item.description
        this.type = Gw2TItemType.valueOf(item.type)
        this.rarity = Gw2TItemRarity.valueOf(item.rarity)
        this.iconUrl = item.iconUrl
    }
}