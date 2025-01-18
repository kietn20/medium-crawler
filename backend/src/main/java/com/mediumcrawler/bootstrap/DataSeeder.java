package com.mediumcrawler.bootstrap;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.model.User;
import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.repository.MediaRepository;
import com.mediumcrawler.repository.UserRepository;
import com.mediumcrawler.repository.WatchListRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

        private final UserRepository userRepository;
        private final MediaRepository mediaRepository;
        private final WatchListRepository watchListRepository;

        public DataSeeder(UserRepository userRepository, MediaRepository mediaRepository,
                        WatchListRepository watchListRepository) {
                this.userRepository = userRepository;
                this.mediaRepository = mediaRepository;
                this.watchListRepository = watchListRepository;
        }

        @Override
        public void run(String... args) throws Exception {
                seedUsers();
                seedMedia();
                seedWatchLists();
        }

        private void seedUsers() {
                if (userRepository.count() == 0) {
                        User john = new User(null, "John Doe", "john@example.com", null);
                        User jane = new User(null, "Jane Smith", "jane@example.com", null);
                        User alice = new User(null, "Alice Premium", "alice@example.com", null);

                        userRepository.saveAll(Arrays.asList(john, jane, alice));
                }
        }

        private void seedMedia() {
                if (mediaRepository.count() == 0) {
                        Media inception = new Media(null, "Inception", "Movie", "A mind-bending thriller", 2010, 9,
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0J0IKeAxdnCKSdAUNTmHmuwdQGrLCcdXHM3TqrXK_jjhFSw0WiYa8dpb4YXufJ4dYTtbQw");
                        Media theDarkKnight = new Media(null, "The Dark Knight", "Movie", "A gritty superhero film",
                                        2008, 10,
                                        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg");
                        Media harryPotter = new Media(null, "Harry Potter", "Book", "A wizard's journey", 1997, 8,
                                        "https://m.media-amazon.com/images/I/718OJKgQOcL.jpg");

                        mediaRepository.saveAll(Arrays.asList(inception, theDarkKnight, harryPotter));
                }
        }

        private void seedWatchLists() {
                if (watchListRepository.count() == 0) {
                        User john = userRepository.findByEmail("john@example.com")
                                        .orElseThrow(() -> new RuntimeException("User not found"));
                        User jane = userRepository.findByEmail("jane@example.com")
                                        .orElseThrow(() -> new RuntimeException("User not found"));

                        Media inception = mediaRepository.findByTitle("Inception")
                                        .orElseThrow(() -> new RuntimeException("Media not found"));
                        Media theDarkKnight = mediaRepository.findByTitle("The Dark Knight")
                                        .orElseThrow(() -> new RuntimeException("Media not found"));
                        Media harryPotter = mediaRepository.findByTitle("Harry Potter")
                                        .orElseThrow(() -> new RuntimeException("Media not found"));

                        WatchList johnsList = new WatchList(null, "John's Favorite Movies", "John's top picks", john,
                                        Arrays.asList(inception, theDarkKnight, harryPotter));
                        WatchList janesList = new WatchList(null, "Jane's WatchList", "Jane's must-watch list", jane,
                                        Arrays.asList(inception));

                        watchListRepository.saveAll(Arrays.asList(johnsList, janesList));
                }
        }

}
