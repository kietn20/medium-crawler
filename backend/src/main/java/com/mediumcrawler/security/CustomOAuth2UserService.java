package com.mediumcrawler.security;

import com.mediumcrawler.model.User;
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

    // Extract user information
    String email = oauth2User.getAttribute("email");
    String name = oauth2User.getAttribute("name");

    // // If email is null, fetch emails using GitHub API
    // if (email == null) {
    //   email = fetchEmailFromGitHub(userRequest.getAccessToken().getTokenValue());
    // }

    if (email == null || name == null) {
      throw new RuntimeException("Failed to retrieve required user information from OAuth2 provider.");
    }

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

  // private String fetchEmailFromGitHub(String accessToken) {
  //   String url = "https://api.github.com/user/emails";
  //   RestTemplate restTemplate = new RestTemplate();

  //   HttpHeaders headers = new HttpHeaders();
  //   headers.setBearerAuth(accessToken);
  //   HttpEntity<?> entity = new HttpEntity<>(headers);

  //   try {
  //     ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
  //         url,
  //         HttpMethod.GET,
  //         entity,
  //         new ParameterizedTypeReference<>() {
  //         });

  //     // Find the primary email
  //     for (Map<String, Object> emailObj : response.getBody()) {
  //       if (Boolean.TRUE.equals(emailObj.get("primary"))) {
  //         return (String) emailObj.get("email");
  //       }
  //     }
  //   } catch (Exception e) {
  //     throw new RuntimeException("Failed to fetch email from GitHub API", e);
  //   }

  //   return null;
  // }
}