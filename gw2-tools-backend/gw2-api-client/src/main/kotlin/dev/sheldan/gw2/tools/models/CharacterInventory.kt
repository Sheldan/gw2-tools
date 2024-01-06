package dev.sheldan.gw2.tools.models

data class CharacterInventory(
    val name: String,
    val bags: List<InventoryBag>
    )
{
}