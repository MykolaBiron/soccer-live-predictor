package com.example.soccerpredictorbackend.repositories;

import com.example.soccerpredictorbackend.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
