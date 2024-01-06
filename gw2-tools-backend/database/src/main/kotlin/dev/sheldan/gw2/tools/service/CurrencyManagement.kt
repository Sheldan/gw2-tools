package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.Currency
import dev.sheldan.gw2.tools.repo.CurrencyRepository
import org.springframework.stereotype.Component

@Component
class CurrencyManagement(val currencyRepository: CurrencyRepository) {
    fun getCurrencies(currencyIds: List<Int>): List<Currency> {
        return currencyRepository.findAllById(currencyIds).toList()
    }

    fun getCurrenciesAsMap(currencyIds: List<Int>): Map<Int, Currency> {
        return getCurrencies(currencyIds).associateBy { it.id }
    }

    fun getCurrencies() : List<Currency> {
        return currencyRepository.findAll().toList()
    }

    fun createAndSaveCurrency(id: Int, name: String, description: String, iconUrl: String): Currency {
        val currency = createCurrency(id, name, description, iconUrl)
        return currencyRepository.save(currency)
    }

    fun createCurrency(id: Int, name: String, description: String, iconUrl: String): Currency {
        return Currency(name, description, iconUrl, null, id)
    }

    fun saveCurrency(currency: Currency): Currency {
        return currencyRepository.save(currency)
    }

    fun saveCurrencies(currencies:  List<Currency>) {
        currencyRepository.saveAll(currencies)
    }
}