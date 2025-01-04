package com.mediumcrawler.dto;

import lombok.Data;

@Data
public class WatchListDTO {
    private String title;
    private String type;
    private String description;
    private Integer year;
    private Integer rating;
    private String imageUrl;
}