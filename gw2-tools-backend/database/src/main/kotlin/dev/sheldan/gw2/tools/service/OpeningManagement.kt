package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.*
import dev.sheldan.gw2.tools.entity.Currency
import dev.sheldan.gw2.tools.repo.OpeningRepository
import org.springframework.stereotype.Component
import java.util.*

@Component
class OpeningManagement(
    val openingRepository: OpeningRepository
) {
    fun createOpening(user: User, items: Map<Item, Int>, currencies: Map<Currency, Int>, description: String?){
        val opening = Opening(user, description = description)
        val openingItems: List<OpeningItem> = items.map { OpeningItem(it.key, opening, it.value) }
        val openingCurrencies: List<OpeningCurrency> = currencies.map { OpeningCurrency(it.key, opening, it.value) }
        opening.currencies = openingCurrencies
        opening.items = openingItems
        openingRepository.save(opening)
    }

    fun getOpeningsByUser(user:  User): List<Opening> {
        return openingRepository.getAllByUser(user)
    }

    fun getAllOpenings(): List<Opening> {
        return openingRepository.findAll().toList()
    }

    fun getOpening(id: Int): Optional<Opening> {
        return openingRepository.findById(id)
    }

    fun deleteOpening(opening: Opening) {
        openingRepository.delete(opening)
    }
}