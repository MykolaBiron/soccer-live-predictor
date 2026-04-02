package com.example.soccerpredictorbackend.services;
import com.example.soccerpredictorbackend.entities.Match;
import com.example.soccerpredictorbackend.repositories.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }
    public List<Match> getMatches() {
        return matchRepository.findAll();
    }
    public Match saveMatch(Match match) {
        return matchRepository.save(match);
    }
}
