package com.example.soccerpredictorbackend.services;

import com.example.soccerpredictorbackend.entities.Match;
import com.example.soccerpredictorbackend.repositories.MatchRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@EnableScheduling
@Service
public class SportAPIService {
    private final MatchRepository matchRepository;
    private final RestClient restClient;

    // 1. Inject the API Key directly into the constructor alongside the Builder
    public SportAPIService(RestClient.Builder restClientBuilder,
                           @Value("${sports.api.key}") String apiKey,
                           MatchRepository matchRepository) {

        // 2. Build the client once during startup
        this.restClient = restClientBuilder
                .baseUrl("https://api.football-data.org/v4")
                .defaultHeader("X-Auth-Token", apiKey) // Use the correct header name
                .build();
        this.matchRepository = matchRepository;
    }

    public ExternalApiResponse fetchLiveMatches() {
        // Get today's date
        String today = LocalDate.now().toString();
        String sixMinutesAgo = LocalDateTime.now().minusMinutes(6).toString();
        String oneDayAhead = LocalDate.now().plusDays(1).toString();
        ExternalApiResponse response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/competitions/PL/matches")
                        .queryParam("dateFrom", today)
                        .queryParam("dateTo", oneDayAhead)
                        .build())
                .retrieve()
                .body(ExternalApiResponse.class);

        System.out.println("API Response for " + today + ": " + response);
        return response;
    }
    private Match convertToEntity(Map<String, Object> apiMatch) {
        Match match = new Match();

        // 1. Extract Teams (Nested in homeTeam/awayTeam objects)
        Map<String, Object> homeTeam = (Map<String, Object>) apiMatch.get("homeTeam");
        Map<String, Object> awayTeam = (Map<String, Object>) apiMatch.get("awayTeam");
        match.setTeam1((String) homeTeam.get("name"));
        match.setTeam2((String) awayTeam.get("name"));

        // 2. Extract Scores (Nested in score -> fullTime)
        Map<String, Object> score = (Map<String, Object>) apiMatch.get("score");
        Map<String, Object> fullTime = (Map<String, Object>) score.get("fullTime");

        // Use ternary to handle potential nulls if the match hasn't started
        match.setTeam1_score(fullTime.get("home") != null ? (int) fullTime.get("home") : 0);
        match.setTeam2_score(fullTime.get("away") != null ? (int) fullTime.get("away") : 0);

        // 3. Extract Dates
        // The API sends utcDate like "2025-11-08T12:30:00Z"
        String utcDateStr = (String) apiMatch.get("utcDate");
        LocalDateTime startDateTime = LocalDateTime.parse(utcDateStr.replace("Z", ""));

        match.setStart_time(startDateTime);
        match.setDate(startDateTime.toLocalDate());

        // 4. Match Minutes (API status)
        // If status is FINISHED, we can set minutes to 90
        String status = (String) apiMatch.get("status");
        match.setMinutes(status.equals("FINISHED") ? 90 : 0);

        return match;
    }
    @Scheduled(fixedRate = 86400000)
    public void updateDatabase() {
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.out.println("Scheduled task. Fetching new matches...");
        System.out.println("========================================>");
        ExternalApiResponse newMatches = fetchLiveMatches();

        for (var exMatch : newMatches.matches()) {
            Match match = convertToEntity(exMatch);
            matchRepository.save(match);
        }
    }
}