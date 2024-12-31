package com.mediumcrawler.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Data
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String type; // e.g., movie, book, anime, manga, tv show

    private String description;

    @Column(name = "\"year\"") // Explicitly quoting the 'year' column
    private int year;

    private int rating;
}
