package dev.sheldan.gw2.tools.service

import dev.sheldan.gw2.tools.entity.User
import dev.sheldan.gw2.tools.repo.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component
import java.security.MessageDigest

@Component
class UserManagement(val userRepository: UserRepository) {
    fun getUser(id: String): User? {
        return userRepository.findByIdOrNull(id)
    }

    fun getOrCreateUser(token: String): User {
        val userId = createUserId(token)
        val possibleUser = getUser(userId)
        return possibleUser ?: createUser(userId)
    }

    fun createUserWithId(id: String): User {
        val userObj = User(id)
        return userRepository.save(userObj)
    }

    fun createUser(token: String): User {
        val hashed = createUserId(token)
        val userObj = User(hashed)
        return userRepository.save(userObj)
    }

    private fun createUserId(token: String): String {
        val md = MessageDigest.getInstance("SHA-256")
        val digest = md.digest(token.toByteArray())
        val hashed = digest.fold("") { str, it -> str + "%02x".format(it) }
        return hashed
    }

}