package com.mediumcrawler.controller;

import com.mediumcrawler.dto.MediaDTO;
import com.mediumcrawler.service.AniListService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/anilist")
public class AniListController {

    private final AniListService aniListService;

    public AniListController(AniListService aniListService) {
        this.aniListService = aniListService;
    }

    @GetMapping("/anime")
    public Mono<List<MediaDTO>> searchAnime(@RequestParam String query) {
        return aniListService.searchAnime(query);
    }
}
