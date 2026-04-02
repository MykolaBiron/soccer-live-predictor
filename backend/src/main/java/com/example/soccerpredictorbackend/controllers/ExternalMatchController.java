package com.example.soccerpredictorbackend.controllers;
import com.example.soccerpredictorbackend.entities.Match;
import com.example.soccerpredictorbackend.services.ExternalApiResponse;
import com.example.soccerpredictorbackend.services.SportAPIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/sports")
public class ExternalMatchController {
    private final SportAPIService sportAPIService;
    public ExternalMatchController(SportAPIService sportAPIService) {
        this.sportAPIService = sportAPIService;
    }
    @GetMapping("/live")
    public ExternalApiResponse getLiveMatches() {
        return sportAPIService.fetchLiveMatches();
    }
}
