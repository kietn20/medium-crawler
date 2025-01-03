package com.mediumcrawler.controller;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.service.MediaService;
import jakarta.validation.Valid;
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

    @GetMapping("/{id}")
    public Media getMediaById(@PathVariable Long id) {
        return mediaService.getMediaById(id);
    }

    @PostMapping
    public Media createMedia(@Valid @RequestBody Media media) {
        return mediaService.createMedia(media);
    }

    @PutMapping("/{id}")
    public Media updateMedia(@PathVariable Long id,@Valid @RequestBody Media updatedMedia) {
        return mediaService.updateMedia(id, updatedMedia);
    }

    @DeleteMapping("/{id}")
    public void deleteMedia(@PathVariable Long id) {
        mediaService.deleteMedia(id);
    }
}