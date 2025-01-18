package com.mediumcrawler.service;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.model.User;
import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.repository.WatchListRepository;
import com.mediumcrawler.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchListService {

    private final WatchListRepository watchListRepository;
    private final UserRepository userRepository;

    public WatchListService(WatchListRepository watchListRepository, UserRepository userRepository) {
        this.watchListRepository = watchListRepository;
        this.userRepository = userRepository;
    }

    public List<WatchList> getAllWatchLists() {
        return watchListRepository.findAll();
    }

    public WatchList getWatchListById(Long id) {
        return watchListRepository.findById(id).orElseThrow(() -> new RuntimeException("WatchList not found"));
    }

    public WatchList createWatchList(WatchList watchList) {
        User user = userRepository.findById(watchList.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User does not exist."));

        // Enforce watchlist limits
        if (watchListRepository.countByUserId(user.getId()) >= 5) {
            throw new RuntimeException("User has reached the maximum number of watchlists allowed.");
        }

        if (watchList.getMedia().size() > 20) {
            throw new RuntimeException("Watchlist exceeds the maximum number of media items allowed.");
        }

        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    public WatchList updateWatchList(Long id, WatchList updatedWatchList) {
        WatchList existingWatchList = watchListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WatchList not found"));

        User user = userRepository.findById(updatedWatchList.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User does not exist."));

        // Enforce media item limits during update
        if (updatedWatchList.getMedia().size() > 20) {
            throw new RuntimeException("Watchlist exceeds the maximum number of media items allowed.");
        }

        existingWatchList.setName(updatedWatchList.getName());
        existingWatchList.setDescription(updatedWatchList.getDescription());
        existingWatchList.setMedia(updatedWatchList.getMedia());
        existingWatchList.setUser(user);

        return watchListRepository.save(existingWatchList);
    }

    public void deleteWatchList(Long id) {
        watchListRepository.deleteById(id);
    }


    public WatchList reorderMedia(Long watchListId, List<Long> newOrder) {
        WatchList watchList = watchListRepository.findById(watchListId)
                .orElseThrow(() -> new RuntimeException("WatchList with ID " + watchListId + " not found."));

        if (newOrder.size() != watchList.getMedia().size()) {
            throw new RuntimeException("New order must contain all media items in the watchlist.");
        }

        System.out.println("Existing WatchList Media IDs: " + watchList.getMedia().stream()
                .map(Media::getId)
                .toList());

        // Ensure all media IDs in newOrder exist in the watchlist
        List<Media> reorderedMedia = newOrder.stream()
                .map(mediaId -> watchList.getMedia().stream()
                        .filter(media -> media.getId().equals(mediaId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Media item with ID " + mediaId + " not found in the watchlist.")))
                .toList();

        // Persist the reordered media
        watchList.getMedia().clear();
        watchList.getMedia().addAll(reorderedMedia);
        WatchList updatedWatchList = watchListRepository.save(watchList);

        System.out.println("Updated WatchList Media IDs: " + updatedWatchList.getMedia().stream()
                .map(Media::getId)
                .toList());

        return updatedWatchList;
    }
}