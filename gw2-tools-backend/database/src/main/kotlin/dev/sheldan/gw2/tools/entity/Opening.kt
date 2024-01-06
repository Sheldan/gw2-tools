package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*
import java.time.Instant

@Entity(name = "opening")
class Opening(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,
    @OneToMany(cascade = [CascadeType.MERGE, CascadeType.PERSIST], orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "opening")
    var currencies: List<OpeningCurrency>? = null,
    @OneToMany(cascade = [CascadeType.MERGE, CascadeType.PERSIST], orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "opening")
    var items: List<OpeningItem>? = null,
    @Column(name = "description")
    var description: String?=null,
    @Column(name = "created", insertable = false, updatable = false)
    var creationDate: Instant?=null,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null
) {


}