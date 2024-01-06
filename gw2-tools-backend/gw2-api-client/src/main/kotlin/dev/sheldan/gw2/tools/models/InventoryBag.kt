package dev.sheldan.gw2.tools.models

data class InventoryBag(
    val id: Int,
    val size: Int,
    val items: List<EnrichedItem>
) {
}