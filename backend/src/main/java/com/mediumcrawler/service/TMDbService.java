package com.mediumcrawler.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class TMDbService {

    private final WebClient webClient;

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    public TMDbService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public Mono<Object> searchMovies(String query) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                .path("/search/movie")
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .build())
                .retrieve()
                .bodyToMono(Object.class);
    }

    public Mono<Object> searchTvShows(String query) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                .path("/search/tv")
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .build())
                .retrieve()
                .bodyToMono(Object.class);
    }

}
