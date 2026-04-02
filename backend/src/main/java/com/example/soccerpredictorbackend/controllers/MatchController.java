package com.example.soccerpredictorbackend.controllers;
import com.example.soccerpredictorbackend.entities.Match;
import com.example.soccerpredictorbackend.repositories.MatchRepository;
import com.example.soccerpredictorbackend.services.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.function.Predicate;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {
    private final MatchService service;
    private final MatchRepository matchRepository;

    public MatchController(MatchService service, MatchRepository matchRepository) {
        this.service = service;
        this.matchRepository = matchRepository;
    }
    @GetMapping
    public List<Match> getMatches() {
        return service.getMatches().stream().sorted().toList();
    }
    @GetMapping("/live")
    public List<Match> getLiveMatches() {
        return service.getMatches().stream()
                .filter(match -> Objects.equals(match.getDate(), LocalDate.now().minusDays(9))).toList();
    }
    @GetMapping("/recent")
    public List<Match> getRecentMatches() {
        Predicate<Match> mPredicate = (match)
                -> match.getDate().isBefore(LocalDate.now())
                && match.getDate().isAfter(LocalDate.now().minusDays(12));
        return matchRepository.findAll().stream()
                .filter(mPredicate).toList();
    }
    @GetMapping("/upcoming")
    public List<Match> getUpcomingMatches() {
        Predicate<Match> mPredicate = (match)
                -> (match.getDate().isAfter(LocalDate.now())
                && (match.getDate().isBefore(LocalDate.now().plusDays(12))));
        return matchRepository.findAll().stream().filter(mPredicate).toList();
    }
    @PostMapping
    public Match postMatch(Match match) {
        return service.saveMatch(match);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable long id) {
        return matchRepository.findById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
