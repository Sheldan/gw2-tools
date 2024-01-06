package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*

@Entity(name = "opening_item")
class OpeningItem(
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "item_id", nullable = false)
    val item: Item,
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "opening_id", nullable = false)
    val opening: Opening,
    @Column(name = "count")
    val count: Int,
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null
) {
}