package dev.sheldan.gw2.tools.model

data class OpeningRequest(
    val items: List<DisplayOpeningItem>,
    val description: String?=null,
) {
}