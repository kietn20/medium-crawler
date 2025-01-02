package com.mediumcrawler.controller;

import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.repository.WatchListRepository;
import com.mediumcrawler.service.WatchListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/watchlists")
public class WatchListController {

    private final WatchListService watchListService;

    public WatchListController(WatchListService watchListService) {
        this.watchListService = watchListService;
    }

    @GetMapping
    public List<WatchList> getAllWatchLists() {
        return watchListService.getAllWatchLists();
    }

    @GetMapping("/{id}")
    public WatchList getWatchListById(@PathVariable Long id) {
        return watchListService.getWatchListById(id);
    }

    @PostMapping
    public WatchList createWatchList(@RequestBody WatchList watchList) {
        return watchListService.createWatchList(watchList);
    }

    @PutMapping("/{id}")
    public WatchList updateWatchList(@PathVariable long id, @RequestBody WatchList updatedWatchList) {
        return watchListService.updateWatchList(id, updatedWatchList);
    }

    @DeleteMapping("/{id}")
    public void deleteWatchList(@PathVariable long id) {
        watchListService.deleteWatchList(id);
    }
}
