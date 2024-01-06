package dev.sheldan.gw2.tools.loader

import dev.sheldan.gw2.tools.models.EnrichedCurrency
import io.github.kryszak.gwatlin.api.miscellaneous.GWMiscellaneousClient
import org.springframework.stereotype.Component

@Component
class CurrencyLoader(
    var miscellaneousClient: GWMiscellaneousClient,
) {
    fun getAllCurrencies(): List<EnrichedCurrency> {
        return miscellaneousClient.getCurrencies().map { EnrichedCurrency(it.id, 0, it.name, it.description, it.icon) }
    }
}