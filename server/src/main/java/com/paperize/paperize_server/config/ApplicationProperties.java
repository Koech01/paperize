package com.paperize.paperize_server.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "spring")
@Getter
@Setter
public class ApplicationProperties {
    private List<String> allowedOrigins;
    private String signInSuccessUrl;
}
