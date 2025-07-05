package com.trackback.item.repository;

import com.trackback.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    
    List<Item> findByUserId(Long userId);
    
    List<Item> findByType(Item.ItemType type);
    
    List<Item> findByStatus(Item.ItemStatus status);
    
    List<Item> findByCategory(String category);
    
    @Query("{'title': {$regex: ?0, $options: 'i'}}")
    List<Item> findByTitleContainingIgnoreCase(String title);
    
    @Query("{'description': {$regex: ?0, $options: 'i'}}")
    List<Item> findByDescriptionContainingIgnoreCase(String description);
    
    @Query("{'tags': {$in: ?0}}")
    List<Item> findByTagsIn(List<String> tags);
    
    @Query("{'dateLostFound': {$gte: ?0, $lte: ?1}}")
    List<Item> findByDateLostFoundBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{'coordinates': {$near: {$geometry: {type: 'Point', coordinates: [?0, ?1]}, $maxDistance: ?2}}}")
    List<Item> findByCoordinatesNear(double longitude, double latitude, double maxDistance);
    
    Page<Item> findByTypeAndStatusOrderByDateReportedDesc(Item.ItemType type, Item.ItemStatus status, Pageable pageable);
    
    @Query("{'$and': [" +
           "{'$or': [{'title': {$regex: ?0, $options: 'i'}}, {'description': {$regex: ?0, $options: 'i'}}, {'tags': {$regex: ?0, $options: 'i'}}]}," +
           "{'type': ?1}," +
           "{'status': 'ACTIVE'}" +
           "]}")
    Page<Item> searchItems(String searchTerm, Item.ItemType type, Pageable pageable);
}