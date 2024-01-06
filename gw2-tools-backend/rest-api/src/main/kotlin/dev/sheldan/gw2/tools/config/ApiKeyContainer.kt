package dev.sheldan.gw2.tools.config

open class ApiKeyContainer : ApiKey {
    var apiKeyValue: String = "";
    override fun getApiKey(): String {
        return apiKeyValue
    }

    override fun setApiKey(key: String) {
        this.apiKeyValue = key
    }
}