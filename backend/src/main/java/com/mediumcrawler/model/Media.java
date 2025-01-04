package com.mediumcrawler.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required.")
    private String title;

    @NotBlank(message = "Type is required.")
    private String type; // e.g., movie, book, anime, manga, tv show
    private String description;

    @Column(name = "\"year\"") // Explicitly quoting the 'year' column
    @NotNull(message = "Year is required.")
    @Min(value = 1900, message = "Year must be after 1900.")
    @Max(value = 2100, message = "Year must be before 2100.")
    private int year;

    @Min(value = 1, message = "Rating must be at least 1.")
    @Max(value = 10, message = "Rating must not exceed 10.")
    private int rating;

    @Pattern(
            regexp = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$",
            message = "Image URL must be a valid URL."
    )
    @Size(max = 2083, message = "URL must not exceed 2083 characters.")
    private String imageUrl;
}
