package com.example.Backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Backend.models.ClickEvent;
import com.example.Backend.models.UrlMapping;

@Repository
public interface ClickEventRepository extends MongoRepository<ClickEvent, ObjectId> {
    List<ClickEvent>findByUrlMappingAndClickDateBetween(UrlMapping urlmapping, LocalDateTime startDate, LocalDateTime endDate);
    List<ClickEvent>findByUrlMappingAndClickDateBetween(List<UrlMapping> urlMappings, LocalDateTime startDate, LocalDateTime endDate);
}
