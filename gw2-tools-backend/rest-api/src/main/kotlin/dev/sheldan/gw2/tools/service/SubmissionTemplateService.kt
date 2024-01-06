package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.ItemNotFoundException
import dev.sheldan.gw2.tools.model.ItemDisplay
import dev.sheldan.gw2.tools.model.SubmissionTemplateDisplay
import dev.sheldan.gw2.tools.model.ItemSubmissionTemplate
import dev.sheldan.gw2.tools.model.ItemSubmissionTemplateList
import org.springframework.stereotype.Component

@Component
class SubmissionTemplateService(
    val submissionTemplateManagement: SubmissionTemplateManagement,
    val itemManagement: ItemManagement
) {
    fun getSubmissionTemplateForItem(itemId: Int): ItemSubmissionTemplate {
        val item = itemManagement.getItem(itemId)?: throw ItemNotFoundException("Item not found.")
        val submissionTemplates = submissionTemplateManagement.getSubmissionTemplatesForItem(item)
        val itemDisplay = ItemDisplay(item.id, item.name, item.iconUrl, item.description, item.rarity)
        val templateDisplays = submissionTemplates.map {
            SubmissionTemplateDisplay(it.name, it.description, it.templateText)
        }
        return ItemSubmissionTemplate(templateDisplays, itemDisplay)
    }

    fun getSubmissionTemplates(): ItemSubmissionTemplateList {
        val submissionTemplates = submissionTemplateManagement.getAllSubmissionTemplates()
        val items = submissionTemplates.associateBy { it.item }.keys
        val itemSubmissionTemplates = items.map { item ->
            val itemDisplay = ItemDisplay(item.id, item.name, item.iconUrl, item.description, item.rarity)
            val submissionTemplatesOfItem = submissionTemplates.filter { it.item.id == item.id }
            val templateDisplays = submissionTemplatesOfItem.map {
                SubmissionTemplateDisplay(it.name, it.description, it.templateText)
            }
            ItemSubmissionTemplate(templateDisplays, itemDisplay)
        }
        return ItemSubmissionTemplateList(itemSubmissionTemplates)
    }
}