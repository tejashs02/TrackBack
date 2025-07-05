package com.trackback.item.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "items")
public class Item {
    @Id
    private String id;
    
    private Long userId;
    private ItemType type;
    private String title;
    private String description;
    private String category;
    private String location;
    
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] coordinates; // [longitude, latitude]
    
    private LocalDateTime dateLostFound;
    private LocalDateTime dateReported;
    private List<String> images;
    private ItemStatus status;
    private String contactEmail;
    private String contactPhone;
    private String preferredContact;
    private Double reward;
    private List<String> tags;
    private Long organizationId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public Item() {
        this.dateReported = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = ItemStatus.ACTIVE;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public ItemType getType() { return type; }
    public void setType(ItemType type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double[] getCoordinates() { return coordinates; }
    public void setCoordinates(double[] coordinates) { this.coordinates = coordinates; }

    public LocalDateTime getDateLostFound() { return dateLostFound; }
    public void setDateLostFound(LocalDateTime dateLostFound) { this.dateLostFound = dateLostFound; }

    public LocalDateTime getDateReported() { return dateReported; }
    public void setDateReported(LocalDateTime dateReported) { this.dateReported = dateReported; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public ItemStatus getStatus() { return status; }
    public void setStatus(ItemStatus status) { this.status = status; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getPreferredContact() { return preferredContact; }
    public void setPreferredContact(String preferredContact) { this.preferredContact = preferredContact; }

    public Double getReward() { return reward; }
    public void setReward(Double reward) { this.reward = reward; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Long getOrganizationId() { return organizationId; }
    public void setOrganizationId(Long organizationId) { this.organizationId = organizationId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public enum ItemType {
        LOST, FOUND
    }

    public enum ItemStatus {
        ACTIVE, MATCHED, RESOLVED, ARCHIVED
    }
}