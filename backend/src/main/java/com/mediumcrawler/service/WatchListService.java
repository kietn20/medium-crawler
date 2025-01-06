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
        int maxWatchlists = getMaxWatchlistsForUser(user);

        // Enforce watchlist limits
        if (watchListRepository.countByUserId(user.getId()) >= maxWatchlists) {
            throw new RuntimeException("User has reached the maximum number of watchlists allowed.");
        }

        int maxMediaItems = getMaxMediaItemsForUser(user);
        if (watchList.getMedia().size() > maxMediaItems) {
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
        int maxMediaItems = getMaxMediaItemsForUser(user);
        if (updatedWatchList.getMedia().size() > maxMediaItems) {
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

    private int getMaxWatchlistsForUser(User user) {
        switch (user.getRole()) {
            case "PREMIUM":
                return 10;
            case "AUTHENTICATED":
                return 5;
            default: // GUEST
                return 1;
        }
    }

    private int getMaxMediaItemsForUser(User user) {
        switch (user.getRole()) {
            case "PREMIUM":
                return 40;
            case "AUTHENTICATED":
                return 20;
            default: // GUEST
                return 8;
        }
    }

    public WatchList reorderMedia(Long watchListId, List<Long> newOrder) {
        WatchList watchList = watchListRepository.findById(watchListId)
                .orElseThrow(() -> new RuntimeException("WatchList not found"));

        List<Media> reorderedMedia = newOrder.stream()
                .map(mediaId -> watchList.getMedia().stream()
                        .filter(media -> media.getId().equals(mediaId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Media item not found in the watchlist")))
                .toList();

        watchList.setMedia(reorderedMedia);
        return watchListRepository.save(watchList);
    }
}