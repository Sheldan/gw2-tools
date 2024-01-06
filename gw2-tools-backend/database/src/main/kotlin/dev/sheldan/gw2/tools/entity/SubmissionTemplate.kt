package dev.sheldan.gw2.tools.entity

import jakarta.persistence.*

@Entity(name = "submission_template")
class SubmissionTemplate(
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "item_id", nullable = false)
    val item: Item,
    @Column(name = "template_text")
    val templateText: String,
    @Column(name = "name")
    val name: String,
    @Column(name = "description")
    val description: String,
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null
) {
}