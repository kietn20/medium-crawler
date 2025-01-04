package com.mediumcrawler.controller;

import com.mediumcrawler.dto.MediaDTO;
import com.mediumcrawler.service.TMDbService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/tmdb")
public class TMDbController {

    private final TMDbService tmdbService;

    public TMDbController(TMDbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/movies")
    public Mono<List<MediaDTO>> searchMovies(@RequestParam String query) {
        return tmdbService.searchMovies(query);
    }

    @GetMapping("/tv")
    public Mono<List<MediaDTO>> searchTvShows(@RequestParam String query) {
        return tmdbService.searchTvShows(query);
    }
}
