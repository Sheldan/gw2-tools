package dev.sheldan.gw2.tools.api

import dev.sheldan.gw2.tools.service.CacheService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ItemController(val cacheService: CacheService) {

    @PostMapping("/item-cache")
    fun updateItemCache() {
        cacheService.reloadItemCache()
    }

}