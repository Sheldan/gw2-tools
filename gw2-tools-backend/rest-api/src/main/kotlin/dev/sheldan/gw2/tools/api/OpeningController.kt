package dev.sheldan.gw2.tools.api

import dev.sheldan.gw2.tools.config.ApiKeyInterceptor
import dev.sheldan.gw2.tools.model.ItemRates
import dev.sheldan.gw2.tools.model.OpeningRequest
import dev.sheldan.gw2.tools.model.OpeningsView
import dev.sheldan.gw2.tools.service.OpeningService
import jakarta.servlet.http.HttpServletRequest
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.annotation.RequestScope

@RestController
@RequestScope
class OpeningController(val openingService: OpeningService) {
    private val logger = KotlinLogging.logger {}

    @PostMapping("/openings")
    @ResponseStatus(HttpStatus.CREATED)
    fun createOpenings(request: HttpServletRequest, @RequestBody openingRequest: OpeningRequest) {
        val apiKey: String = request.getHeader(ApiKeyInterceptor.API_KEY_HEADER_NAME) ?: throw IllegalArgumentException("API key not provided.")
        openingService.createOpening(openingRequest, apiKey)
    }

    @GetMapping("/openings")
    fun getOpenings(request: HttpServletRequest, @RequestParam("showOwnOnly") ownOnly: String?): OpeningsView {
        val apiKey: String? = request.getHeader(ApiKeyInterceptor.API_KEY_HEADER_NAME)
        val showOnOnly = ownOnly.toBoolean()
        logger.info { "Retrieving openings" }
        val loadedOpenings = openingService.loadOpenings(apiKey, showOnOnly)
        logger.info { "Loaded ${loadedOpenings.openings.size} openings" }
        return loadedOpenings
    }

    @DeleteMapping("/openings/{id}")
    fun deleteOpening(request: HttpServletRequest, @PathVariable("id") openingId: Int) {
        val apiKey: String = request.getHeader(ApiKeyInterceptor.API_KEY_HEADER_NAME) ?: throw IllegalArgumentException("API key not provided.")
        openingService.deleteOpening(apiKey, openingId)
    }

    @GetMapping("/itemRates")
    fun getItemRates(): ItemRates {
        return openingService.loadItemRates()
    }
}