package com.mediumcrawler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.mediumcrawler.dto.MediaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AniListService {

    private final WebClient webClient;

    public AniListService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://graphql.anilist.co")
                .build();
    }

    public Mono<List<MediaDTO>> searchAnime(String query) {
        String graphqlQuery = """
                query ($search: String) {
                  Media(search: $search, type: ANIME) {
                    title {
                      romaji
                      english
                      native
                    }
                    description
                    startDate {
                      year
                    }
                    coverImage {
                      large
                    }
                  }
                }
                """;

        // Create request body
        Map<String, Object> requestBody = Map.of(
                "query", graphqlQuery,
                "variables", Map.of("search", query)
        );

        return webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::parseAnimeList);
    }

    private List<MediaDTO> parseAnimeList(JsonNode jsonNode) {
        List<MediaDTO> animeList = new ArrayList<>();
        jsonNode.get("data").get("Media").forEach(media -> {
            MediaDTO anime = new MediaDTO();
            anime.setTitle(media.get("title").get("english").asText());
            anime.setDescription(media.get("description").asText());
            anime.setReleaseDate(media.get("startDate").get("year").asText());
            anime.setPosterPath(media.get("coverImage").get("large").asText());
            animeList.add(anime);
        });
        return animeList;
    }
}

