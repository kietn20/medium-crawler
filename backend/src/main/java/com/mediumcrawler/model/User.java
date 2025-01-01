package com.mediumcrawler.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;


@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String profilePicture;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude // Prevent recursion
    private List<WatchList> watchLists;
}
