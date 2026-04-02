package com.example.soccerpredictorbackend.services;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/*
* dateFrom={DATE}
dateTo={DATE}
season={YEAR}
competitions={competitionIds}
status={STATUS}
venue={VENUE}
limit={LIMIT}*/
@JsonIgnoreProperties(ignoreUnknown = true)
public record ExternalApiResponse (
    Integer count,
    List<Map<String, Object>> matches,
    Map<String, Object> competitions) {}

