package dev.sheldan.gw2.tools.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity(name = "gw2_user")
class User( @Id
            @Column(name="id", nullable = false)
            val id: String) {


}