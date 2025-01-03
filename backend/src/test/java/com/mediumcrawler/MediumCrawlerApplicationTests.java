package com.mediumcrawler;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.model.User;
import com.mediumcrawler.repository.MediaRepository;
import com.mediumcrawler.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class MediumCrawlerApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MediaRepository mediaRepository;

	@Test
	public void testFindByEmail() {
		Optional<User> user = userRepository.findByEmail("john@example.com");
		assertTrue(user.isPresent());
	}

	@Test
	public void testFindByTitle() {
		Optional<Media> media = mediaRepository.findByTitle("Inception");
		assertTrue(media.isPresent());
	}
}

