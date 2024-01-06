package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*

@Entity(name = "currency")
class Currency(@Column(name="name", nullable = false)
            val name: String,

               @Column(name="description")
            val description: String,

               @Column(name="icon_url", nullable = false)
            val iconUrl: String,

               @OneToMany(
                   fetch = FetchType.LAZY,
                   cascade = [CascadeType.PERSIST, CascadeType.MERGE],
                   mappedBy = "currency"
               )
               private var openings: List<OpeningCurrency>? = null,

               @Id
            @Column(name="id", nullable = false)
            val id: Int) {


}