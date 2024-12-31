package com.mediumcrawler.controller;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.service.MediaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public List<Media> getAllMedia() {
        return mediaService.getAllMedia();
    }

    @PostMapping
    public Media addMedia(@RequestBody Media media) {
        System.out.println("Received Media: " + media);
        return mediaService.addMedia(media);
    }
}