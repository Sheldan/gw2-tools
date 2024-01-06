package dev.sheldan.gw2.tools.repo

import dev.sheldan.gw2.tools.entity.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, String> {
}