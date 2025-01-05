package com.mediumcrawler.controller;

import com.mediumcrawler.dto.MediaDTO;
import com.mediumcrawler.service.RawgService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/rawg")
public class GameController {

    private final RawgService rawgService;

    public GameController(RawgService rawgService) {
        this.rawgService = rawgService;
    }

    @GetMapping("/games")
    public Mono<List<MediaDTO>> searchGames(@RequestParam String query) {
        return rawgService.searchGames(query);
    }
}