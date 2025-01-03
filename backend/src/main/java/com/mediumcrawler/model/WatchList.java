package com.mediumcrawler.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude // Prevent recursion
    @NotNull(message = "User is require.")
    @JsonBackReference // Prevent serialization of the user reference in WatchList
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
