package com.mediumcrawler.bootstrap;

import com.mediumcrawler.model.User;
import com.mediumcrawler.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userRepository.save(new User(null, "John Doe", "john@example.com", "https://example.com/john.png", null));
            userRepository.save(new User(null, "Jane Smith", "jane@example.com", "https://example.com/jane.png", null));
        }
    }
}

