# TrackBack - Java Spring Boot Microservices Architecture

## 🏗️ System Architecture Overview

TrackBack follows a microservices architecture pattern with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │   API Gateway   │    │ Service Registry│
│   (Port 3000)   │◄──►│   (Port 8080)   │◄──►│   (Port 8761)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
        │ User Service │ │ Item Service│ │Match Service│
        │ (Port 8081)  │ │ (Port 8082) │ │(Port 8084) │
        └──────────────┘ └─────────────┘ └────────────┘
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
        │   Database   │ │  Database   │ │  Database  │
        │   (MySQL)    │ │  (MongoDB)  │ │  (MySQL)   │
        └──────────────┘ └─────────────┘ └────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- MongoDB 4.4+
- Redis 6.0+
- RabbitMQ 3.8+

### Project Structure
```
trackback-backend/
├── eureka-server/              # Service Registry
├── api-gateway/               # API Gateway
├── user-service/              # User Management
├── item-service/              # Lost/Found Items
├── match-service/             # Matching Engine
├── notification-service/      # Notifications
├── admin-service/             # Admin Operations
├── shared/                    # Shared Libraries
│   ├── common-models/         # Common DTOs/Entities
│   ├── security-config/       # JWT Security
│   └── exception-handler/     # Global Exception Handling
└── docker-compose.yml         # Infrastructure Setup
```

## 🔧 Microservices Details

### 1. Eureka Server (Service Registry)
**Port:** 8761
**Purpose:** Service discovery and registration

```yaml
# application.yml
server:
  port: 8761
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```

### 2. API Gateway
**Port:** 8080
**Purpose:** Route requests, load balancing, authentication

```yaml
# application.yml
server:
  port: 8080
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
        - id: item-service
          uri: lb://item-service
          predicates:
            - Path=/api/items/**
```

### 3. User Service
**Port:** 8081
**Database:** MySQL
**Purpose:** User authentication, profile management

#### Key Endpoints:
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Database Schema:
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN', 'ORGANIZATION') NOT NULL,
    avatar_url VARCHAR(500),
    organization_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. Item Service
**Port:** 8082
**Database:** MongoDB
**Purpose:** Manage lost and found items

#### Key Endpoints:
- `POST /api/items` - Create new item
- `GET /api/items` - Search items with filters
- `GET /api/items/{id}` - Get item details
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

#### MongoDB Document Structure:
```json
{
  "_id": "ObjectId",
  "userId": "string",
  "type": "LOST|FOUND",
  "title": "string",
  "description": "string",
  "category": "string",
  "location": {
    "address": "string",
    "coordinates": [longitude, latitude]
  },
  "dateReported": "ISODate",
  "dateLostFound": "ISODate",
  "images": ["string"],
  "status": "ACTIVE|MATCHED|RESOLVED|ARCHIVED",
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "preferredContact": "EMAIL|PHONE"
  },
  "reward": "number",
  "tags": ["string"],
  "organizationId": "string",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 5. Match Service
**Port:** 8084
**Database:** MySQL
**Purpose:** AI-powered matching of lost and found items

#### Key Endpoints:
- `POST /api/matches/find` - Find potential matches
- `GET /api/matches/user/{userId}` - Get user matches
- `PUT /api/matches/{id}/confirm` - Confirm match
- `PUT /api/matches/{id}/reject` - Reject match

#### Database Schema:
```sql
CREATE TABLE matches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    lost_item_id VARCHAR(255) NOT NULL,
    found_item_id VARCHAR(255) NOT NULL,
    similarity_score DECIMAL(5,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED') DEFAULT 'PENDING',
    verified_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 6. Notification Service
**Port:** 8086
**Purpose:** Handle email/SMS notifications

#### Key Endpoints:
- `POST /api/notifications/email` - Send email notification
- `POST /api/notifications/sms` - Send SMS notification
- `GET /api/notifications/user/{userId}` - Get user notifications

### 7. Admin Service
**Port:** 8085
**Purpose:** Administrative operations

#### Key Endpoints:
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - Manage users
- `GET /api/admin/items` - Manage items
- `POST /api/admin/organizations/verify` - Verify organizations

## 🔐 Security Implementation

### JWT Authentication
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }
    
    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### Role-Based Access Control
- **USER**: Can create/manage own items, view matches
- **ORGANIZATION**: Can manage organization items, view analytics
- **ADMIN**: Full system access, user management, system configuration

## 📊 Database Design

### MySQL Tables (User & Match Services)
```sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN', 'ORGANIZATION') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Organizations table
CREATE TABLE organizations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('AIRPORT', 'UNIVERSITY', 'MALL', 'TRANSPORT', 'OTHER') NOT NULL,
    address TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE matches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    lost_item_id VARCHAR(255) NOT NULL,
    found_item_id VARCHAR(255) NOT NULL,
    similarity_score DECIMAL(5,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Collections (Item Service)
```javascript
// Items collection
{
  _id: ObjectId,
  userId: String,
  type: "LOST" | "FOUND",
  title: String,
  description: String,
  category: String,
  location: {
    address: String,
    coordinates: [Number, Number] // [longitude, latitude]
  },
  dateReported: Date,
  dateLostFound: Date,
  images: [String],
  status: "ACTIVE" | "MATCHED" | "RESOLVED" | "ARCHIVED",
  contactInfo: {
    email: String,
    phone: String,
    preferredContact: "EMAIL" | "PHONE"
  },
  reward: Number,
  tags: [String],
  organizationId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment Instructions

### 1. Local Development Setup

#### Start Infrastructure Services
```bash
# Start MySQL, MongoDB, Redis, RabbitMQ
docker-compose up -d mysql mongodb redis rabbitmq

# Wait for services to be ready
docker-compose logs -f
```

#### Start Microservices (in order)
```bash
# 1. Start Eureka Server
cd eureka-server
mvn spring-boot:run

# 2. Start API Gateway
cd ../api-gateway
mvn spring-boot:run

# 3. Start User Service
cd ../user-service
mvn spring-boot:run

# 4. Start Item Service
cd ../item-service
mvn spring-boot:run

# 5. Start Match Service
cd ../match-service
mvn spring-boot:run

# 6. Start Notification Service
cd ../notification-service
mvn spring-boot:run

# 7. Start Admin Service
cd ../admin-service
mvn spring-boot:run
```

### 2. Docker Deployment
```bash
# Build all services
mvn clean package -DskipTests

# Build Docker images
docker-compose build

# Start all services
docker-compose up -d

# Check service health
docker-compose ps
```

### 3. Production Deployment
```bash
# Using Docker Swarm or Kubernetes
kubectl apply -f k8s/
```

## 🔧 Configuration Files

### application.yml (Common Configuration)
```yaml
spring:
  application:
    name: trackback-service
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}
  
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always

logging:
  level:
    com.trackback: DEBUG
    org.springframework.cloud: DEBUG
```

### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: trackback123
      MYSQL_DATABASE: trackback
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:6.0-alpine
    ports:
      - "6379:6379"

  rabbitmq:
    image: rabbitmq:3.8-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: trackback
      RABBITMQ_DEFAULT_PASS: trackback123

volumes:
  mysql_data:
  mongodb_data:
```

## 🧪 Testing Strategy

### Unit Tests
```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserServiceTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    void shouldCreateUser() {
        // Test implementation
    }
}
```

### Integration Tests
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "spring.profiles.active=test")
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldRegisterUser() {
        // Test implementation
    }
}
```

## 📈 Monitoring & Observability

### Health Checks
- Spring Boot Actuator endpoints
- Custom health indicators
- Database connectivity checks

### Metrics
- Micrometer with Prometheus
- Custom business metrics
- Performance monitoring

### Logging
- Structured logging with Logback
- Centralized logging with ELK stack
- Correlation IDs for request tracing

## 🔄 API Documentation

### Swagger/OpenAPI Integration
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.trackback"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }
}
```

Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

## 🚀 Running the Complete System

1. **Start Infrastructure**: `docker-compose up -d mysql mongodb redis rabbitmq`
2. **Start Eureka Server**: `cd eureka-server && mvn spring-boot:run`
3. **Start API Gateway**: `cd api-gateway && mvn spring-boot:run`
4. **Start All Services**: Run each service with `mvn spring-boot:run`
5. **Start React Frontend**: `npm run dev` (from the React project)

### Service URLs:
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **Swagger UI**: http://localhost:8080/swagger-ui.html

### Default Test Accounts:
- **Admin**: admin@trackback.com / admin123
- **Organization**: org@trackback.com / org123
- **User**: user@trackback.com / user123

This architecture provides a scalable, maintainable, and production-ready foundation for the TrackBack Lost & Found Management System.