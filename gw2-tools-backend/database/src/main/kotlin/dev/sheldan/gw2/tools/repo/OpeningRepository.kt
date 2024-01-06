package dev.sheldan.gw2.tools.repo

import dev.sheldan.gw2.tools.entity.Opening
import dev.sheldan.gw2.tools.entity.User
import org.springframework.data.repository.CrudRepository

interface OpeningRepository : CrudRepository<Opening, Int> {
    fun getAllByUser(user: User): List<Opening>
}