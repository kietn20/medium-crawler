package com.mediumcrawler.security;

import com.mediumcrawler.model.User;
import com.mediumcrawler.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  private final UserRepository userRepository;

  public CustomOAuth2UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) {
    OAuth2User oauth2User = super.loadUser(userRequest);

    String email = oauth2User.getAttribute("email");
    String name = oauth2User.getAttribute("name");

    // Check if user exists in the database
    Optional<User> existingUser = userRepository.findByEmail(email);
    if (existingUser.isEmpty()) {
      // Register new user
      User newUser = new User();
      newUser.setEmail(email);
      newUser.setName(name);
      userRepository.save(newUser);
    }

    return new DefaultOAuth2User(oauth2User.getAuthorities(), oauth2User.getAttributes(), "email");
  }
}