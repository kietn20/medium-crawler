package com.mediumcrawler.controller;

import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.repository.WatchListRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/watchlists")
public class WatchListController {

    private final WatchListRepository watchListRepository;

    public WatchListController(WatchListRepository watchListRepository) {
        this.watchListRepository = watchListRepository;
    }

    @GetMapping
    public List<WatchList> getAllWatchLists() {
        return watchListRepository.findAll();
    }

    @PostMapping
    public WatchList createWatchList(@RequestBody WatchList watchList) {
        return watchListRepository.save(watchList);
    }

    @GetMapping("/{id}")
    public WatchList getWatchListById(@PathVariable Long id) {
        return watchListRepository.findById(id).orElseThrow(() -> new RuntimeException("WatchList not found."));
    }

    @PutMapping("/{id}")
    public WatchList updateWatchList(@PathVariable long id, @RequestBody WatchList updatedWatchList) {
        WatchList existingWatchList = watchListRepository.findById(id).orElseThrow(() -> new RuntimeException("WatchList not found."));
        existingWatchList.setName(updatedWatchList.getName());
        existingWatchList.setDescription(updatedWatchList.getDescription());
        existingWatchList.setMedia(updatedWatchList.getMedia());
        return watchListRepository.save((existingWatchList));
    }

    @DeleteMapping("/{id}")
    public void deleteWatchList(@PathVariable long id) {
        watchListRepository.deleteById(id);
    }
}
