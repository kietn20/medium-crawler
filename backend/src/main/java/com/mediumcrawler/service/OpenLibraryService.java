package com.mediumcrawler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.mediumcrawler.dto.MediaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpenLibraryService {

    private final WebClient webClient;

    public OpenLibraryService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://openlibrary.org")
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // Increase buffer limit to 10 MB
                .build();
    }

    public Mono<List<MediaDTO>> searchBooks(String query) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search.json")
                        .queryParam("q", query)
                        .queryParam("limit", 5) // Limit results to 20
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::parseBookList);
    }

    private List<MediaDTO> parseBookList(JsonNode jsonNode) {
        List<MediaDTO> books = new ArrayList<>();
        jsonNode.get("docs").forEach(doc -> {
            MediaDTO book = new MediaDTO();
            book.setTitle(doc.get("title").asText());
            book.setDescription(doc.has("author_name") ? "Author: " + doc.get("author_name").get(0).asText() : "No author available");
            book.setReleaseDate(doc.has("first_publish_year") ? String.valueOf(doc.get("first_publish_year").asInt()) : "Unknown");
            book.setPosterPath(doc.has("cover_i") ?
                    "https://covers.openlibrary.org/b/id/" + doc.get("cover_i").asText() + "-L.jpg"
                    : null);
            books.add(book);
        });
        return books;
    }
}
