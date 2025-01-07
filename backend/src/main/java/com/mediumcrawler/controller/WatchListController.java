package com.mediumcrawler.controller;

import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.service.WatchListService;
import jakarta.validation.Valid;
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
    public WatchList createWatchList(@Valid @RequestBody WatchList watchList) {
        return watchListService.createWatchList(watchList);
    }

    @PutMapping("/{id}")
    public WatchList updateWatchList(@PathVariable long id, @RequestBody WatchList updatedWatchList) {
        return watchListService.updateWatchList(id, updatedWatchList);
    }

    @PutMapping("/{id}/reorder")
    public WatchList reorderMedia(@PathVariable Long id, @RequestBody List<Long> newOrder) {
        System.out.println("New Order: " + newOrder);
        return watchListService.reorderMedia(id, newOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteWatchList(@PathVariable long id) {
        watchListService.deleteWatchList(id);
    }
}
