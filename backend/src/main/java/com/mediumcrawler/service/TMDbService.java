package com.mediumcrawler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.mediumcrawler.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class TMDbService {

    private final WebClient webClient;

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    public TMDbService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public Mono<List<MovieDTO>> searchMovies(String query) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                .path("/search/movie")
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .build())
                .retrieve()
                .bodyToMono(JsonNode.class) // Map JSON response
                .map(jsonNode -> {
                    List<MovieDTO> movies = new ArrayList<>();
                    jsonNode.get("results").forEach(result -> {
                        MovieDTO movie = new MovieDTO();
                        movie.setTitle(result.get("title").asText());
                        movie.setOverview(result.get("overview").asText());
                        movie.setReleaseDate(result.get("release_date").asText());
                        movie.setPosterPath("https://image.tmdb.org/t/p/w500" + result.get("poster_path").asText());
                        movies.add(movie);
                    });
                    return movies;
                });
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
