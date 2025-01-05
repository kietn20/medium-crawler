package com.mediumcrawler.controller;

import com.mediumcrawler.dto.MediaDTO;
import com.mediumcrawler.service.MediaSearchService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/media-search")
public class MediaSearchController {

    private final MediaSearchService mediaSearchService;

    public MediaSearchController(MediaSearchService mediaSearchService) {
        this.mediaSearchService = mediaSearchService;
    }

    @PostMapping()
    public Mono<List<MediaDTO>> searchMedia(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        String type = request.get("type");
        return mediaSearchService.searchMedia(query, type);
    }
}
