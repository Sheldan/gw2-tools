package dev.sheldan.gw2.tools

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication(exclude = [org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration::class])
@EnableJpaRepositories(basePackages = ["dev.sheldan.gw2"])
class ToolApplication

fun main(args: Array<String>) {
	runApplication<ToolApplication>(*args)
}
