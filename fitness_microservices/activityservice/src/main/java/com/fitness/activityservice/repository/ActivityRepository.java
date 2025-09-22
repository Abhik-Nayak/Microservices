package com.fitness.activityservice.repository;

import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.model.ActivityType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String> {
    
    // Find activities by user ID
    List<Activity> findByUserId(String userId);
    
    // Find activities by user ID and activity type
    List<Activity> findByUserIdAndType(String userId, ActivityType type);
    
    // Find activities by user ID within a date range
    List<Activity> findByUserIdAndStartTimeBetween(String userId, LocalDateTime startTime, LocalDateTime endTime);
    
    // Find activities by user ID and activity type within a date range
    List<Activity> findByUserIdAndTypeAndStartTimeBetween(String userId, ActivityType type, LocalDateTime startTime, LocalDateTime endTime);
    
    // Find activities by activity type
    List<Activity> findByType(ActivityType type);
    
    // Find activities within a date range
    List<Activity> findByStartTimeBetween(LocalDateTime startTime, LocalDateTime endTime);
    
    // Find activities by user ID ordered by start time (most recent first)
    List<Activity> findByUserIdOrderByStartTimeDesc(String userId);
    
    // Find activities by user ID ordered by start time (oldest first)
    List<Activity> findByUserIdOrderByStartTimeAsc(String userId);
    
    // Find activities by user ID with minimum duration
    List<Activity> findByUserIdAndDurationGreaterThanEqual(String userId, Integer minDuration);
    
    // Find activities by user ID with minimum calories burned
    List<Activity> findByUserIdAndCaloriesBurnedGreaterThanEqual(String userId, Integer minCalories);
    
    // Custom query to find activities by user ID with specific metrics
    @Query("{ 'userId': ?0, 'additionalMetrics.?1': ?2 }")
    List<Activity> findByUserIdAndSpecificMetric(String userId, String metricKey, Object metricValue);
    
    // Count activities by user ID
    long countByUserId(String userId);
    
    // Count activities by user ID and type
    long countByUserIdAndType(String userId, ActivityType type);
    
    // Count activities by user ID within date range
    long countByUserIdAndStartTimeBetween(String userId, LocalDateTime startTime, LocalDateTime endTime);
    
    // Delete activities by user ID
    void deleteByUserId(String userId);
    
    // Delete activities by user ID and type
    void deleteByUserIdAndType(String userId, ActivityType type);
}
