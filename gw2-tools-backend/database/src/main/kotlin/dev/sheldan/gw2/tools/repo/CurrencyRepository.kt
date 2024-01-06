package dev.sheldan.gw2.tools.repo

import dev.sheldan.gw2.tools.entity.Currency
import org.springframework.data.repository.CrudRepository

interface CurrencyRepository : CrudRepository<Currency, Int> {
}