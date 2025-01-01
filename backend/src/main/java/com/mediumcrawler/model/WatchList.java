package com.mediumcrawler.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Entity
@Data
public class WatchList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude // Prevent recursion
    private User user;

    @ManyToMany
    @JoinTable(
            name = "watchlist_media",
            joinColumns = @JoinColumn(name = "watchlist_id"),
            inverseJoinColumns = @JoinColumn(name = "media_id")
    )
    @ToString.Exclude // Prevent recursion
    private List<Media> media;
}
