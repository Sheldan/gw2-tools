package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*

@Entity(name = "opening_currency")
class OpeningCurrency(
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "currency_id", nullable = false)
    val currency: Currency,
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "opening_id", nullable = false)
    val opening: Opening,
    @Column(name = "amount")
    val amount: Int,
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null
) {
}