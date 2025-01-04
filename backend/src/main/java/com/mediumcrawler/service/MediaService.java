package com.mediumcrawler.service;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.repository.MediaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public Media getMediaById(Long id) {
        return mediaRepository.findById(id).orElseThrow(() -> new RuntimeException("Media not found"));
    }

    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }

    public Media updateMedia(Long id, Media updatedMedia) {
        Media existingMedia = mediaRepository.findById(id).orElseThrow(() -> new RuntimeException("Media not found"));
        existingMedia.setTitle(updatedMedia.getTitle());
        existingMedia.setType(updatedMedia.getType());
        existingMedia.setDescription(updatedMedia.getDescription());
        existingMedia.setYear(updatedMedia.getYear());
        existingMedia.setRating(updatedMedia.getRating());
        existingMedia.setImageUrl(updatedMedia.getImageUrl());
        return mediaRepository.save(existingMedia);
    }

    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }
}