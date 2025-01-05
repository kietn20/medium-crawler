package com.mediumcrawler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.mediumcrawler.dto.MediaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

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

        return webClient.post()
                .bodyValue(createRequestBody(graphqlQuery, query))
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::parseAnimeList);
    }

    private JsonNode createRequestBody(String query, String search) {
        return WebClient.create()
                .post()
                .uri("https://graphql.anilist.co")
                .bodyValue("{\"query\":\"" + query + "\",\"variables\":{\"search\":\"" + search + "\"}}")
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
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
