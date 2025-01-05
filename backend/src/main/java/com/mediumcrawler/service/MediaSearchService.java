package com.mediumcrawler.service;

import com.mediumcrawler.dto.MediaDTO;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class MediaSearchService {

    private final TMDbService tmdbService;
    private final OpenLibraryService openLibraryService;
    private final RawgService rawgService;
    private final AniListService aniListService;

    public MediaSearchService(TMDbService tmdbService, OpenLibraryService openLibraryService, RawgService rawgService, AniListService aniListService) {
        this.tmdbService = tmdbService;
        this.openLibraryService = openLibraryService;
        this.rawgService = rawgService;
        this.aniListService = aniListService;
    }

    public Mono<List<MediaDTO>> searchMedia(String query, String type) {
        switch (type.toLowerCase()) {
            case "movie":
            case "tv":
                return tmdbService.searchMovies(query); // TMDb handles both movies and TV shows
            case "book":
                return openLibraryService.searchBooks(query);
            case "game":
                return rawgService.searchGames(query);
            case "anime":
            case "manga":
                return aniListService.searchAnime(query);
            default:
                throw new IllegalArgumentException("Invalid media type: " + type);
        }
    }
}
