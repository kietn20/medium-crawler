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

    public Media addMedia(Media media) {
        return mediaRepository.save(media);
    }
}
