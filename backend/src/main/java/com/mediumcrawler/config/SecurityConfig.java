package com.mediumcrawler.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/media-search", "/api/tmdb/movies").permitAll() // Allow access to media
                                                                                              // search and tmdb movies
                                                                                              // endpoints
                        .requestMatchers("/api/**").authenticated() // Require authentication for other API endpoints
                        .anyRequest().permitAll())
                .csrf(csrf -> csrf.disable()) // Disable CSRF if you are not managing CSRF tokens
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173", true) // Redirect to frontend after login
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:5173") // Redirect to frontend after logout
                );
        // .cors(cors -> cors.configurationSource(corsConfigurationSource())); // Enable
        // CORS

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}