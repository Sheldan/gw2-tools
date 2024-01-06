package dev.sheldan.gw2.tools.config

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.servlet.HandlerInterceptor

class ApiKeyInterceptor(private val apiKeyContainer: ApiKey) : HandlerInterceptor {

    companion object {
        const val API_KEY_HEADER_NAME = "api-key"
    }

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val apiKey: String? = request.getHeader(API_KEY_HEADER_NAME)
        apiKey?.let { apiKeyContainer.setApiKey(it) }
        return true
    }
}