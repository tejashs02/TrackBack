package com.trackback.item.service;

import com.trackback.item.entity.Item;
import com.trackback.item.repository.ItemRepository;
import com.trackback.shared.dto.ItemDto;
import com.trackback.shared.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemDto createItem(ItemDto itemDto) {
        Item item = convertToEntity(itemDto);
        Item savedItem = itemRepository.save(item);
        return convertToDto(savedItem);
    }

    public ItemDto getItemById(String id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        return convertToDto(item);
    }

    public List<ItemDto> getItemsByUserId(Long userId) {
        List<Item> items = itemRepository.findByUserId(userId);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<ItemDto> searchItems(String searchTerm, String type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Item.ItemType itemType = type != null ? Item.ItemType.valueOf(type.toUpperCase()) : null;
        
        Page<Item> items;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            items = itemRepository.searchItems(searchTerm, itemType, pageable);
        } else {
            items = itemRepository.findByTypeAndStatusOrderByDateReportedDesc(
                    itemType != null ? itemType : Item.ItemType.LOST, 
                    Item.ItemStatus.ACTIVE, 
                    pageable
            );
        }
        
        return items.map(this::convertToDto);
    }

    public List<ItemDto> getItemsByType(String type) {
        Item.ItemType itemType = Item.ItemType.valueOf(type.toUpperCase());
        List<Item> items = itemRepository.findByType(itemType);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<ItemDto> getItemsByCategory(String category) {
        List<Item> items = itemRepository.findByCategory(category);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<ItemDto> getNearbyItems(double longitude, double latitude, double radiusInMeters) {
        List<Item> items = itemRepository.findByCoordinatesNear(longitude, latitude, radiusInMeters);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ItemDto updateItem(String id, ItemDto itemDto) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

        // Update fields
        item.setTitle(itemDto.getTitle());
        item.setDescription(itemDto.getDescription());
        item.setCategory(itemDto.getCategory());
        item.setLocation(itemDto.getLocation());
        item.setDateLostFound(itemDto.getDateLostFound());
        item.setImages(itemDto.getImages());
        item.setContactEmail(itemDto.getContactEmail());
        item.setContactPhone(itemDto.getContactPhone());
        item.setPreferredContact(itemDto.getPreferredContact());
        item.setReward(itemDto.getReward());
        item.setTags(itemDto.getTags());
        item.setUpdatedAt(LocalDateTime.now());

        if (itemDto.getLatitude() != null && itemDto.getLongitude() != null) {
            item.setCoordinates(new double[]{itemDto.getLongitude(), itemDto.getLatitude()});
        }

        Item updatedItem = itemRepository.save(item);
        return convertToDto(updatedItem);
    }

    public void deleteItem(String id) {
        if (!itemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    public ItemDto updateItemStatus(String id, String status) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

        item.setStatus(Item.ItemStatus.valueOf(status.toUpperCase()));
        item.setUpdatedAt(LocalDateTime.now());

        Item updatedItem = itemRepository.save(item);
        return convertToDto(updatedItem);
    }

    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private Item convertToEntity(ItemDto dto) {
        Item item = new Item();
        item.setUserId(dto.getUserId());
        item.setType(Item.ItemType.valueOf(dto.getType().toUpperCase()));
        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setCategory(dto.getCategory());
        item.setLocation(dto.getLocation());
        item.setDateLostFound(dto.getDateLostFound());
        item.setImages(dto.getImages());
        item.setContactEmail(dto.getContactEmail());
        item.setContactPhone(dto.getContactPhone());
        item.setPreferredContact(dto.getPreferredContact());
        item.setReward(dto.getReward());
        item.setTags(dto.getTags());
        item.setOrganizationId(dto.getOrganizationId());

        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            item.setCoordinates(new double[]{dto.getLongitude(), dto.getLatitude()});
        }

        return item;
    }

    private ItemDto convertToDto(Item item) {
        ItemDto dto = new ItemDto();
        dto.setId(item.getId());
        dto.setUserId(item.getUserId());
        dto.setType(item.getType().name());
        dto.setTitle(item.getTitle());
        dto.setDescription(item.getDescription());
        dto.setCategory(item.getCategory());
        dto.setLocation(item.getLocation());
        dto.setDateLostFound(item.getDateLostFound());
        dto.setDateReported(item.getDateReported());
        dto.setImages(item.getImages());
        dto.setStatus(item.getStatus().name());
        dto.setContactEmail(item.getContactEmail());
        dto.setContactPhone(item.getContactPhone());
        dto.setPreferredContact(item.getPreferredContact());
        dto.setReward(item.getReward());
        dto.setTags(item.getTags());
        dto.setOrganizationId(item.getOrganizationId());
        dto.setCreatedAt(item.getCreatedAt());
        dto.setUpdatedAt(item.getUpdatedAt());

        if (item.getCoordinates() != null && item.getCoordinates().length == 2) {
            dto.setLongitude(item.getCoordinates()[0]);
            dto.setLatitude(item.getCoordinates()[1]);
        }

        return dto;
    }
}