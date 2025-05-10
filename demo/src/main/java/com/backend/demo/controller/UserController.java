package com.backend.demo.controller;

import com.backend.demo.model.User;
import com.backend.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            logger.info("Received signup request for user: {}", user.getEmail());
            logger.debug("Signup request details: name={}, email={}", user.getName(), user.getEmail());
            
            if (user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
                logger.error("Missing required fields in signup request");
                return ResponseEntity.badRequest().body("Missing required fields");
            }
            
            User createdUser = userService.createUser(user);
            logger.info("User created successfully: {}", createdUser.getEmail());
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            logger.error("Error during signup: ", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody User loginRequest) {
        try {
            logger.info("Received signin request for user: {}", loginRequest.getEmail());
            
            if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                logger.error("Missing email or password in signin request");
                return ResponseEntity.badRequest().body("Email and password are required");
            }
            
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            logger.info("User authenticated successfully: {}", user.getEmail());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error during signin: ", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/profile/update")
    public ResponseEntity<?> updateProfile(
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("goal") String goal,
            @RequestParam("age") int age,
            @RequestParam("weight") int weight,
            @RequestParam("height") int height,
            @RequestParam("fitnessLevel") String fitnessLevel,
            @RequestParam("weeklyGoal") int weeklyGoal,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            User user = userOpt.get();
            user.setName(name);
            // You can add goal, age, weight, height, fitnessLevel, weeklyGoal to User model as needed
            // For now, only name and photo are handled

            if (photo != null && !photo.isEmpty()) {
                String uploadsDir = "uploads/";
                Files.createDirectories(Paths.get(uploadsDir));
                String filename = email + "_" + photo.getOriginalFilename();
                Path filePath = Paths.get(uploadsDir, filename);
                Files.write(filePath, photo.getBytes());
                user.setProfilePhotoUrl("/api/user/profile/photo/" + filename);
            }
            userService.saveUser(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile/photo/{filename}")
    public ResponseEntity<?> getProfilePhoto(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads", filename);
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            byte[] fileBytes = Files.readAllBytes(filePath);
            return ResponseEntity.ok().body(fileBytes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 