package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.Item
import dev.sheldan.gw2.tools.entity.SubmissionTemplate
import dev.sheldan.gw2.tools.repo.SubmissionTemplateRepository
import org.springframework.stereotype.Component

@Component
class SubmissionTemplateManagement(
    val submissionTemplateRepository: SubmissionTemplateRepository
) {

    fun getSubmissionTemplatesForItem(item: Item): List<SubmissionTemplate> {
        return submissionTemplateRepository.getSubmissionTemplateByItem(item)
    }

    fun getAllSubmissionTemplates(): List<SubmissionTemplate> {
        return submissionTemplateRepository.findAll().toList()
    }

}