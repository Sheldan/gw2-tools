package dev.sheldan.gw2.tools.model

import dev.sheldan.gw2.tools.models.EnrichedCurrency
import dev.sheldan.gw2.tools.models.EnrichedItem

class ItemRate(val item: EnrichedItem, val receivedItems: List<EnrichedItem>, val receivedCurrencies: List<EnrichedCurrency>) {
}