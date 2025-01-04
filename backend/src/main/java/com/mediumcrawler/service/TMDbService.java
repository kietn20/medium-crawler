package com.mediumcrawler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.mediumcrawler.dto.MediaDTO;
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

    // Search movies
    public Mono<List<MediaDTO>> searchMovies(String query) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/movie")
                        .queryParam("api_key", apiKey)
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> parseMediaList(jsonNode, "title", "overview", "release_date", "poster_path"));
    }

    // Search TV shows
    public Mono<List<MediaDTO>> searchTvShows(String query) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/tv")
                        .queryParam("api_key", apiKey)
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> parseMediaList(jsonNode, "name", "overview", "first_air_date", "poster_path"));
    }

    // Helper method to parse API response
    private List<MediaDTO> parseMediaList(JsonNode jsonNode, String titleField, String descriptionField, String releaseDateField, String posterPathField) {
        List<MediaDTO> mediaList = new ArrayList<>();
        jsonNode.get("results").forEach(result -> {
            MediaDTO media = new MediaDTO();
            media.setTitle(result.get(titleField).asText());
            media.setDescription(result.get(descriptionField).asText());
            media.setReleaseDate(result.has(releaseDateField) ? result.get(releaseDateField).asText() : null);
            media.setPosterPath("https://image.tmdb.org/t/p/w500" + result.get(posterPathField).asText());
            mediaList.add(media);
        });
        return mediaList;
    }

}
