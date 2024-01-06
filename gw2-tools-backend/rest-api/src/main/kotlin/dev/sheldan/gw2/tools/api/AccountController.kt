package dev.sheldan.gw2.tools.api

import dev.sheldan.gw2.tools.loader.AccountLoader
import dev.sheldan.gw2.tools.models.AccountMaterialView
import dev.sheldan.gw2.tools.models.AccountVaultView
import dev.sheldan.gw2.tools.models.AccountWalletView
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.annotation.RequestScope

@RestController
@RequestScope
class AccountController(var accountLoader: AccountLoader) {
    @GetMapping("/characters")
    fun inventory(): List<String>? {
        return accountLoader.getCharacters()
    }

    @GetMapping("/wallet")
    fun wallet(): AccountWalletView {
        return accountLoader.getWallet()
    }

    @GetMapping("/bank")
    fun bank(): AccountVaultView {
        return accountLoader.getBank()
    }

    @GetMapping("/materials")
    fun materials(): AccountMaterialView {
        return accountLoader.getMaterials()
    }
}