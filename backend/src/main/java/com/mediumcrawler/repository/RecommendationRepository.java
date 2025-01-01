package com.mediumcrawler.repository;

import com.mediumcrawler.model.Media;
import com.mediumcrawler.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
}
