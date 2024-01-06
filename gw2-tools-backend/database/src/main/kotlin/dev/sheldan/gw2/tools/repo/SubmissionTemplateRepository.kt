package dev.sheldan.gw2.tools.repo

import dev.sheldan.gw2.tools.entity.Item
import dev.sheldan.gw2.tools.entity.SubmissionTemplate
import org.springframework.data.repository.CrudRepository

interface SubmissionTemplateRepository : CrudRepository<SubmissionTemplate, Int> {
    fun getSubmissionTemplateByItem(item: Item): List<SubmissionTemplate>
}