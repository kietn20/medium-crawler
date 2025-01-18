package com.mediumcrawler.security;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.model.User;
import com.mediumcrawler.model.WatchList;
import com.mediumcrawler.repository.UserRepository;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

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

    if (email == null || name == null) {
      throw new RuntimeException("Failed to retrieve required user information from OAuth2 provider.");
    }

    User user = userRepository.findByEmail(email).orElseGet(() -> {
      User newUser = new User();
      newUser.setEmail(email);
      newUser.setName(name);

      // Create a default media list
      WatchList defaultWatchList = new WatchList();
      defaultWatchList.setName("medium crawler");
      defaultWatchList.setDescription("Default watchlist");
      defaultWatchList.setUser(newUser);
      defaultWatchList.setMedia(createDefaultMediaList());

      newUser.setWatchLists(List.of(defaultWatchList));
      return userRepository.save(newUser);
    });

    return new DefaultOAuth2User(oauth2User.getAuthorities(), oauth2User.getAttributes(), "email");
  }

  private List<Media> createDefaultMediaList() {
    Media defaultMediaObject = new Media(null, "", "", "", 0, 0, "");
    return List.of(defaultMediaObject, defaultMediaObject, defaultMediaObject, defaultMediaObject,
        defaultMediaObject, defaultMediaObject, defaultMediaObject, defaultMediaObject,
        defaultMediaObject, defaultMediaObject);
  }
}