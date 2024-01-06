package dev.sheldan.gw2.tools.repo

import dev.sheldan.gw2.tools.entity.Item
import org.springframework.data.repository.CrudRepository

interface ItemRepository : CrudRepository<Item, Int> {
}