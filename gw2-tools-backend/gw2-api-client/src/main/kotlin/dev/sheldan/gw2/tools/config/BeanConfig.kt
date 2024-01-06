package dev.sheldan.gw2.tools.config

import io.github.kryszak.gwatlin.api.account.GWAccountClient
import io.github.kryszak.gwatlin.api.characters.GWCharactersClient
import io.github.kryszak.gwatlin.api.items.GWItemsClient
import io.github.kryszak.gwatlin.api.miscellaneous.GWMiscellaneousClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.ScopedProxyMode
import org.springframework.web.context.annotation.RequestScope

@Configuration
class BeanConfig(val apiKey: ApiKey) {

    @Bean
    @RequestScope(proxyMode = ScopedProxyMode.DEFAULT)
    fun gwCharacterClient(): GWCharactersClient {
        return GWCharactersClient(apiKey.getApiKey())
    }

    @Bean
    @RequestScope(proxyMode = ScopedProxyMode.DEFAULT)
    fun getAccountClient(): GWAccountClient {
        return GWAccountClient(apiKey.getApiKey())
    }

    @Bean
    fun getMiscellaneousClient(): GWMiscellaneousClient {
        return GWMiscellaneousClient()
    }

    @Bean
    fun gwItemClient(): GWItemsClient {
        return GWItemsClient()
    }


}