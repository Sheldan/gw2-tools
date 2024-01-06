package dev.sheldan.gw2.tools.models

import io.github.kryszak.gwatlin.api.items.model.item.ItemRarity

enum class Gw2TItemRarity {
    JUNK,
    BASIC,
    FINE,
    MASTERWORK,
    RARE,
    EXOTIC,
    ASCENDED,
    LEGENDARY;

    companion object {
        fun convertFromAPI(rarity: ItemRarity): Gw2TItemRarity = when (rarity) {
            ItemRarity.FINE -> FINE
            ItemRarity.MASTERWORK -> MASTERWORK
            ItemRarity.RARE -> RARE
            ItemRarity.EXOTIC -> EXOTIC
            ItemRarity.JUNK -> JUNK
            ItemRarity.BASIC -> BASIC
            ItemRarity.ASCENDED -> ASCENDED
            ItemRarity.LEGENDARY -> LEGENDARY
        }
    }

}