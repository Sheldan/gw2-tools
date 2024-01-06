package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*

@Entity(name = "item")
class Item(@Column(name="name", nullable = false)
            val name: String,

           @Column(name="description")
            val description: String,

           @Column(name="icon_url", nullable = false)
            val iconUrl: String,

           @Column(name="type", nullable = false)
            val type: String,

           @Column(name="rarity", nullable = false)
            val rarity: String,

           @OneToMany(cascade = [CascadeType.MERGE, CascadeType.PERSIST], orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "item")
           var submissionTemplates: List<SubmissionTemplate>? = null,

           @OneToMany(
               fetch = FetchType.LAZY,
               cascade = [CascadeType.PERSIST, CascadeType.MERGE],
               mappedBy = "item"
           )
           private var openings: List<OpeningItem>? = null,

           @Id
            @Column(name="id", nullable = false)
            val id: Int) {


}