package com.example.soccerpredictorbackend.entities;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="matches")
public class Match implements Comparable<Match> {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int Id;
    private LocalDate date;
    private LocalDateTime start_time;
    private String team1;
    private String team2;
    private int minutes;
    private int team1_score;
    private int team2_score;

    public Match() {

    }

    public int getId() {
        return Id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalDateTime getStart_time() {
        return start_time;
    }

    public int getTeam1_score() {
        return team1_score;
    }

    public int getTeam2_score() {
        return team2_score;
    }

    public int getMinutes() {
        return minutes;
    }
    public String getTeam2() {
        return team2;
    }

    public String getTeam1() {
        return team1;
    }

    public void setId(int id) {
        Id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStart_time(LocalDateTime start_time) {
        this.start_time = start_time;
    }

    public void setTeam1(String team1) {
        this.team1 = team1;
    }

    public void setTeam2(String team2) {
        this.team2 = team2;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public void setTeam1_score(int team1_score) {
        this.team1_score = team1_score;
    }

    public void setTeam2_score(int team2_score) {
        this.team2_score = team2_score;
    }

    @Override
    public int compareTo(Match o) {
        int dayDiff = this.getDate().getDayOfYear() - o.getDate().getDayOfYear();
        if (dayDiff != 0) {
            return dayDiff;
        }
        return 0;
    }
}
