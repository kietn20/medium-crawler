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
public class RawgService {

    private final WebClient webClient;

    @Value("${RAWG_API_KEY}")
    private String apiKey;

    public RawgService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.rawg.io/api")
                .build();
    }

    public Mono<List<MediaDTO>> searchGames(String query) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/games")
                        .queryParam("key", apiKey)
                        .queryParam("search", query)
                        .queryParam("page_size", 10)
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::parseGameList);
    }

    private List<MediaDTO> parseGameList(JsonNode jsonNode) {
        List<MediaDTO> games = new ArrayList<>();
        jsonNode.get("results").forEach(result -> {
            MediaDTO game = new MediaDTO();
            game.setTitle(result.get("name").asText());
            game.setDescription(result.has("description") ? result.get("description").asText() : "No description available");
            game.setReleaseDate(result.has("released") ? result.get("released").asText() : "Unknown");
            game.setPosterPath(result.has("background_image") ? result.get("background_image").asText() : null);
            games.add(game);
        });
        return games;
    }
}
