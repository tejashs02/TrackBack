package com.trackback.item.controller;

import com.trackback.item.service.ItemService;
import com.trackback.shared.dto.ItemDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemDto> createItem(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody ItemDto itemDto) {
        itemDto.setUserId(userId);
        ItemDto createdItem = itemService.createItem(itemDto);
        return ResponseEntity.ok(createdItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable String id) {
        ItemDto item = itemService.getItemById(id);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ItemDto>> getUserItems(@RequestHeader("X-User-Id") Long userId) {
        List<ItemDto> items = itemService.getItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ItemDto>> searchItems(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ItemDto> items = itemService.searchItems(q, type, page, size);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ItemDto>> getItemsByType(@PathVariable String type) {
        List<ItemDto> items = itemService.getItemsByType(type);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemDto>> getItemsByCategory(@PathVariable String category) {
        List<ItemDto> items = itemService.getItemsByCategory(category);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<ItemDto>> getNearbyItems(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam(defaultValue = "5000") double radius) {
        List<ItemDto> items = itemService.getNearbyItems(longitude, latitude, radius);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDto> updateItem(
            @PathVariable String id,
            @Valid @RequestBody ItemDto itemDto) {
        ItemDto updatedItem = itemService.updateItem(id, itemDto);
        return ResponseEntity.ok(updatedItem);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ItemDto> updateItemStatus(
            @PathVariable String id,
            @RequestParam String status) {
        ItemDto updatedItem = itemService.updateItemStatus(id, status);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}