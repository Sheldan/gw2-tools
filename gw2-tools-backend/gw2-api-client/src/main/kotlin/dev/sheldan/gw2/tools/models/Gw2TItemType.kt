package dev.sheldan.gw2.tools.models

import io.github.kryszak.gwatlin.api.items.model.item.ItemType

enum class Gw2TItemType {
    CONTAINER,
    ARMOR,
    BACK,
    BAG,
    CONSUMABLE,
    CRAFTING_MATERIAL,
    GATHERING,
    GIZMO,
    JADE_TECH_MODULE,
    KEY,
    MINI_PET,
    POWER_CORE,
    TOOL,
    TRAIT,
    TRINKET,
    TROPHY,
    UPGRADE_COMPONENT,
    WEAPON,
    RELIC;

    companion object {
        fun convertFromAPI(type: ItemType): Gw2TItemType = when (type) {
            ItemType.CONTAINER -> CONTAINER
            ItemType.ARMOR -> ARMOR
            ItemType.BACK -> BACK
            ItemType.BAG -> BAG
            ItemType.CONSUMABLE -> CONSUMABLE
            ItemType.CRAFTING_MATERIAL -> CRAFTING_MATERIAL
            ItemType.GATHERING -> GATHERING
            ItemType.GIZMO -> GIZMO
            ItemType.JADE_TECH_MODULE -> JADE_TECH_MODULE
            ItemType.KEY -> KEY
            ItemType.MINI_PET -> MINI_PET
            ItemType.POWER_CORE -> POWER_CORE
            ItemType.TOOL -> TOOL
            ItemType.TRAIT -> TRAIT
            ItemType.TRINKET -> TRINKET
            ItemType.TROPHY -> TROPHY
            ItemType.UPGRADE_COMPONENT -> UPGRADE_COMPONENT
            ItemType.WEAPON -> WEAPON
            ItemType.RELIC -> RELIC
        }
    }

}

