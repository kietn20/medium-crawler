package com.mediumcrawler.controller;

import com.mediumcrawler.dto.MediaDTO;
import com.mediumcrawler.service.OpenLibraryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/openlibrary")
public class OpenLibraryController {

    private final OpenLibraryService openLibraryService;

    public OpenLibraryController(OpenLibraryService openLibraryService) {
        this.openLibraryService = openLibraryService;
    }

    @GetMapping("/books")
    public Mono<List<MediaDTO>> searchBooks(@RequestParam String query) {
        return openLibraryService.searchBooks(query);
    }
}
