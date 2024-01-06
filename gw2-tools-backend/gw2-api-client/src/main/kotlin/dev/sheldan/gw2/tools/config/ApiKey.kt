package dev.sheldan.gw2.tools.config

interface ApiKey {
    fun getApiKey(): String
    fun setApiKey(key: String)
}