package dev.sheldan.gw2.tools.model

import dev.sheldan.gw2.tools.models.EnrichedCurrency
import dev.sheldan.gw2.tools.models.EnrichedItem
import java.time.Instant

class OpeningView(
    val itemChanges: List<EnrichedItem>,
    val currencyChanges: List<EnrichedCurrency>,
    val openingId: Int,
    val description: String?,
    val openingDate: Instant) {
}