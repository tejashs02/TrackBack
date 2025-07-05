package com.trackback.item.controller;

import com.trackback.item.service.ItemService;
import com.trackback.shared.dto.ItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class AdminItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/all")
    public ResponseEntity<List<ItemDto>> getAllItems() {
        List<ItemDto> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }
}