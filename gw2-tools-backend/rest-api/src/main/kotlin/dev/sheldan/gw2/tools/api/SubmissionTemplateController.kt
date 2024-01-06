package dev.sheldan.gw2.tools.api

import dev.sheldan.gw2.tools.ItemNotFoundException
import dev.sheldan.gw2.tools.service.SubmissionTemplateService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class SubmissionTemplateController(
    val submissionTemplateService: SubmissionTemplateService
) {
    @GetMapping("/submissionTemplates")
    @ResponseBody
    fun getSubmissionTemplatesForItem(@RequestParam("itemId") itemId: Int?): ResponseEntity<Any> {
        try {
            val responseObj =  itemId?.let { submissionTemplateService.getSubmissionTemplateForItem(itemId) } ?: submissionTemplateService.getSubmissionTemplates()
            return ResponseEntity(responseObj, HttpStatus.OK)
        } catch (e: ItemNotFoundException) {
            return ResponseEntity(e.message, HttpStatus.BAD_REQUEST)
        }
    }
}