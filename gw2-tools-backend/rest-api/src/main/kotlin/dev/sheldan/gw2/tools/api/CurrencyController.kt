package dev.sheldan.gw2.tools.api

import dev.sheldan.gw2.tools.service.CacheService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CurrencyController(val cacheService: CacheService) {

    @PostMapping("/currency-cache")
    fun updateCurrencyCache() {
        cacheService.reloadCurrencyCache()
    }

}