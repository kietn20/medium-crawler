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

        Map<String, Object> requestBody = Map.of(
                "query", graphqlQuery,
                "variables", Map.of("search", query)
        );

        return webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .doOnNext(response -> {
                    System.out.println("AniList API Response: " + response.toPrettyString());
                })
                .map(this::parseAnimeList);
    }

    private List<MediaDTO> parseAnimeList(JsonNode jsonNode) {
        List<MediaDTO> animeList = new ArrayList<>();
        JsonNode media = jsonNode.get("data").get("Media");

        if (media != null) {
            MediaDTO anime = new MediaDTO();
            anime.setTitle(media.get("title").get("english").asText());
            anime.setDescription(media.has("description") ? media.get("description").asText() : "No description available");
            anime.setReleaseDate(media.has("startDate") && media.get("startDate").has("year")
                    ? String.valueOf(media.get("startDate").get("year").asInt())
                    : "Unknown");
            anime.setPosterPath(media.has("coverImage") ? media.get("coverImage").get("large").asText() : null);
            animeList.add(anime);
        }
        return animeList;
    }
}

