package com.mediumcrawler.service;

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
        // Ensure the user exists
        User user = userRepository.findById(watchList.getUser().getId()).orElseThrow(() -> new RuntimeException("User does not exist."));
        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    public WatchList updateWatchList(Long id, WatchList updatedWatchList) {
        WatchList existingWatchList = watchListRepository.findById(id).orElseThrow(() -> new RuntimeException("WatchList not found"));
        existingWatchList.setName(updatedWatchList.getName());
        existingWatchList.setDescription(updatedWatchList.getDescription());
        existingWatchList.setMedia(updatedWatchList.getMedia());
        return watchListRepository.save(existingWatchList);
    }

    public void deleteWatchList(Long id) {
        watchListRepository.deleteById(id);
    }
}