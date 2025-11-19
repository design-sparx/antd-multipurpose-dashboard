# ASP.NET Web API Implementation Guide

## Dashboard Backend Endpoints for admin-hub-api

This guide provides a complete implementation specification for creating backend endpoints to serve the mock JSON data from the `antd-multipurpose-dashboard` React application.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Implementation Patterns](#implementation-patterns)
3. [Endpoints by Dashboard](#endpoints-by-dashboard)
4. [Model Definitions](#model-definitions)
5. [Implementation Checklist](#implementation-checklist)

---

## Project Structure

Based on the existing `admin-hub-api` architecture, new endpoints should follow this structure:

```
AdminHubApi/
├── Controllers/
│   └── Antd/
│       ├── AntdBaseController.cs          # Base controller (exists)
│       ├── AuctionController.cs           # NEW
│       ├── BiddingController.cs           # NEW
│       ├── CampaignsController.cs         # NEW
│       ├── LearningController.cs          # NEW
│       ├── LogisticsController.cs         # NEW
│       ├── SocialController.cs            # NEW
│       ├── TasksController.cs             # NEW
│       └── ...
├── Dtos/
│   └── Antd/
│       ├── Auction/
│       ├── Bidding/
│       ├── Campaigns/
│       ├── Learning/
│       ├── Logistics/
│       └── ...
├── Entities/
│   └── Antd/
│       ├── AuctionCreator.cs
│       ├── BiddingTransaction.cs
│       └── ...
├── Interfaces/
│   └── Antd/
│       ├── IAuctionService.cs
│       └── ...
├── Services/
│   └── Antd/
│       ├── AuctionService.cs
│       └── ...
└── Repositories/
    └── Antd/
        └── ...
```

---

## Implementation Patterns

### Controller Pattern

```csharp
using Microsoft.AspNetCore.Mvc;

namespace AdminHubApi.Controllers.Antd;

[ApiController]
[Route("api/v1/antd/[controller]")]
[Tags("Antd Dashboard")]
public class AuctionController : AntdBaseController
{
    private readonly IAuctionService _auctionService;

    public AuctionController(
        IAuctionService auctionService,
        ILogger<AuctionController> logger) : base(logger)
    {
        _auctionService = auctionService;
    }

    [HttpGet("creators")]
    [PermissionAuthorize("Antd.Auction.View")]
    [ProducesResponseType(typeof(AuctionCreatorListResponse), 200)]
    public async Task<IActionResult> GetCreators(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _auctionService.GetCreatorsAsync(page, pageSize);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching auction creators");
            return ErrorResponse("Failed to fetch auction creators");
        }
    }
}
```

### Service Interface Pattern

```csharp
namespace AdminHubApi.Interfaces.Antd;

public interface IAuctionService
{
    Task<AuctionCreatorListResponse> GetCreatorsAsync(int page, int pageSize);
    Task<AuctionCreatorResponse> GetCreatorByIdAsync(string id);
    Task<LiveAuctionListResponse> GetLiveAuctionsAsync(int page, int pageSize);
}
```

### Service Implementation Pattern

```csharp
namespace AdminHubApi.Services.Antd;

public class AuctionService : IAuctionService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AuctionService> _logger;

    public AuctionService(
        ApplicationDbContext context,
        ILogger<AuctionService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<AuctionCreatorListResponse> GetCreatorsAsync(int page, int pageSize)
    {
        var query = _context.AuctionCreators.AsQueryable();

        var total = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new AuctionCreatorDto
            {
                CreatorId = c.CreatorId,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                Country = c.Country,
                SalesCount = c.SalesCount,
                TotalSales = c.TotalSales
            })
            .ToListAsync();

        return new AuctionCreatorListResponse
        {
            Success = true,
            Data = items,
            Total = total,
            Page = page,
            PageSize = pageSize
        };
    }
}
```

### DTO Pattern

```csharp
namespace AdminHubApi.Dtos.Antd.Auction;

public class AuctionCreatorDto
{
    public string CreatorId { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string? PostalCode { get; set; }
    public string FavoriteColor { get; set; } = string.Empty;
    public int SalesCount { get; set; }
    public string TotalSales { get; set; } = string.Empty;
}

public class AuctionCreatorListResponse
{
    public bool Success { get; set; }
    public List<AuctionCreatorDto> Data { get; set; } = new();
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}
```

### Entity Pattern

```csharp
using System.ComponentModel.DataAnnotations;

namespace AdminHubApi.Entities.Antd;

public class AuctionCreator
{
    [Key]
    public string CreatorId { get; set; } = Guid.NewGuid().ToString();

    [Required, MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    public int Age { get; set; }

    [Required, EmailAddress, MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Country { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? PostalCode { get; set; }

    [MaxLength(50)]
    public string FavoriteColor { get; set; } = string.Empty;

    public int SalesCount { get; set; }

    [MaxLength(50)]
    public string TotalSales { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
```

---

## Endpoints by Dashboard

### 1. Auction/Bidding Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/auction/creators` | GET | `AuctionCreators.json` | List auction creators |
| `/api/v1/antd/auction/creators/{id}` | GET | - | Get creator by ID |
| `/api/v1/antd/auction/live` | GET | `LiveAuction.json` | List live auctions |
| `/api/v1/antd/bidding/top-sellers` | GET | `BiddingTopSellers.json` | Top sellers list |
| `/api/v1/antd/bidding/transactions` | GET | `BiddingTransactions.json` | Transaction history |

#### AuctionCreators.json Schema

```csharp
public class AuctionCreatorDto
{
    public string CreatorId { get; set; }      // "creator_id"
    public string FirstName { get; set; }       // "first_name"
    public string LastName { get; set; }        // "last_name"
    public int Age { get; set; }                // "age"
    public string Email { get; set; }           // "email"
    public string Country { get; set; }         // "country"
    public string? PostalCode { get; set; }     // "postal_code"
    public string FavoriteColor { get; set; }   // "favorite_color"
    public int SalesCount { get; set; }         // "sales_count"
    public string TotalSales { get; set; }      // "total_sales"
}
```

#### BiddingTransactions.json Schema

```csharp
public class BiddingTransactionDto
{
    public string Id { get; set; }              // "id"
    public string Image { get; set; }           // "image" (base64)
    public string ProductId { get; set; }       // "product_id"
    public string TransactionDate { get; set; } // "transaction_date"
    public string Seller { get; set; }          // "seller"
    public string Buyer { get; set; }           // "buyer"
    public decimal PurchasePrice { get; set; }  // "purchase_price"
    public decimal SalePrice { get; set; }      // "sale_price"
    public decimal Profit { get; set; }         // "profit"
    public int Quantity { get; set; }           // "quantity"
    public string ShippingAddress { get; set; } // "shipping_address"
    public string? State { get; set; }          // "state"
    public string Country { get; set; }         // "country"
    public string TransactionType { get; set; } // "transaction_type": "transfer"|"refund"
}
```

---

### 2. Marketing/Campaigns Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/campaigns` | GET | `Campaigns.json` | List all campaigns |
| `/api/v1/antd/campaigns/{id}` | GET | - | Get campaign by ID |
| `/api/v1/antd/campaigns` | POST | - | Create campaign |
| `/api/v1/antd/campaigns/{id}` | PUT | - | Update campaign |
| `/api/v1/antd/campaigns/{id}` | DELETE | - | Delete campaign |
| `/api/v1/antd/campaigns/ads` | GET | `CampaignAds.json` | List campaign ads |

#### Campaigns.json Schema

```csharp
public class CampaignDto
{
    public string CampaignId { get; set; }      // "campaign_id"
    public string CampaignName { get; set; }    // "campaign_name"
    public string StartDate { get; set; }       // "start_date"
    public string EndDate { get; set; }         // "end_date"
    public string TargetAudience { get; set; }  // "target_audience"
    public string Budget { get; set; }          // "budget"
    public string CampaignObjective { get; set; } // "campaign_objective"
    public string Platform { get; set; }        // "platform": "Facebook"|"LinkedIn"
    public int Impressions { get; set; }        // "impressions"
    public int Clicks { get; set; }             // "clicks"
    public string Status { get; set; }          // "status": "pending"|"cancelled"|"active"
}
```

---

### 3. Projects Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/projects` | GET | `Projects.json` | List all projects |
| `/api/v1/antd/projects/{id}` | GET | - | Get project by ID |
| `/api/v1/antd/projects` | POST | - | Create project |
| `/api/v1/antd/projects/{id}` | PUT | - | Update project |
| `/api/v1/antd/projects/{id}` | DELETE | - | Delete project |
| `/api/v1/antd/projects/clients` | GET | `Clients.json` | List project clients |

---

### 4. Learning Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/learning/courses` | GET | `Courses.json` | List all courses |
| `/api/v1/antd/learning/courses/{id}` | GET | - | Get course by ID |
| `/api/v1/antd/learning/courses/recommended` | GET | `RecommendedCourses.json` | Recommended courses |
| `/api/v1/antd/learning/exams` | GET | `Exams.json` | List exams |
| `/api/v1/antd/learning/community-groups` | GET | `CommunityGroups.json` | Community groups |
| `/api/v1/antd/learning/study-statistics` | GET | `StudyStatistics.json` | Study stats |

#### Courses.json Schema

```csharp
public class CourseDto
{
    public string Id { get; set; }              // "id"
    public string Name { get; set; }            // "name"
    public string Code { get; set; }            // "code"
    public string Description { get; set; }     // "description"
    public string InstructorName { get; set; }  // "instructor_name"
    public string StartDate { get; set; }       // "start_date"
    public string EndDate { get; set; }         // "end_date"
    public int CreditHours { get; set; }        // "credit_hours"
    public string Department { get; set; }      // "department"
    public string Prerequisites { get; set; }   // "prerequisites"
    public string CourseLocation { get; set; }  // "course_location"
    public int TotalLessons { get; set; }       // "total_lessons"
    public int CurrentLessons { get; set; }     // "current_lessons"
    public string FavoriteColor { get; set; }   // "favorite_color"
}
```

#### CommunityGroups.json Schema

```csharp
public class CommunityGroupDto
{
    public string Id { get; set; }              // "id"
    public string Name { get; set; }            // "name"
    public string Description { get; set; }     // "description"
    public string Image { get; set; }           // "image" (base64)
    public string Category { get; set; }        // "category"
    public string Location { get; set; }        // "location"
    public int Size { get; set; }               // "size"
    public string Leader { get; set; }          // "leader"
    public string StartDate { get; set; }       // "start_date"
    public string MeetingTime { get; set; }     // "meeting_time"
    public int MemberAgeRange { get; set; }     // "member_age_range"
    public string MemberInterests { get; set; } // "member_interests"
    public string FavoriteColor { get; set; }   // "favorite_color"
}
```

---

### 5. Logistics Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/logistics/trucks` | GET | `Trucks.json` | List all trucks |
| `/api/v1/antd/logistics/trucks/{id}` | GET | - | Get truck by ID |
| `/api/v1/antd/logistics/deliveries` | GET | `TruckDeliveries.json` | Delivery list |
| `/api/v1/antd/logistics/delivery-requests` | GET | `TruckDeliveryRequest.json` | Delivery requests |
| `/api/v1/antd/logistics/analytics` | GET | `DeliveryAnalytics.json` | Analytics data |

#### Trucks.json Schema

```csharp
public class TruckDto
{
    public string TruckId { get; set; }         // "truck_id"
    public string Make { get; set; }            // "make": "Chevrolet"|"Toyota"
    public string Model { get; set; }           // "model"
    public int Year { get; set; }               // "year"
    public int Mileage { get; set; }            // "mileage"
    public decimal Price { get; set; }          // "price"
    public string Color { get; set; }           // "color"
    public string Status { get; set; }          // "status": "in transit"|"delivered"
    public bool Availability { get; set; }      // "availability"
    public string Origin { get; set; }          // "origin"
    public string Destination { get; set; }     // "destination"
    public int Progress { get; set; }           // "progress" (percentage)
}
```

---

### 6. Orders Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/orders/recent` | GET | `RecentOrders.json` | Recent orders |
| `/api/v1/antd/orders/by-country` | GET | `CountryOrders.json` | Orders by country |

#### CountryOrders.json Schema

```csharp
public class CountryOrderDto
{
    public string Country { get; set; }         // "country"
    public int Orders { get; set; }             // "orders"
    public string Revenue { get; set; }         // "revenue"
    public string CustomerName { get; set; }    // "customer_name"
    public string CustomerEmail { get; set; }   // "customer_email"
    public string ShippingAddress { get; set; } // "shipping_address"
    public string ProductName { get; set; }     // "product_name"
    public string OrderDate { get; set; }       // "order_date"
    public string DeliveryStatus { get; set; }  // "delivery_status"
    public string PaymentMethod { get; set; }   // "payment_method"
}
```

---

### 7. Products Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/products/top` | GET | `TopProducts.json` | Top products |
| `/api/v1/antd/products/categories/top` | GET | `TopCategories.json` | Top categories |
| `/api/v1/antd/sellers/top` | GET | `TopSeller.json` | Top sellers |

#### TopSeller.json Schema

```csharp
public class TopSellerDto
{
    public string Id { get; set; }                  // "id"
    public string FirstName { get; set; }           // "first_name"
    public string LastName { get; set; }            // "last_name"
    public int Age { get; set; }                    // "age"
    public string Email { get; set; }               // "email"
    public string Country { get; set; }             // "country"
    public string? PostalCode { get; set; }         // "postal_code"
    public string FavoriteColor { get; set; }       // "favorite_color"
    public int SalesVolume { get; set; }            // "sales_volume"
    public decimal TotalSales { get; set; }         // "total_sales"
    public decimal CustomerSatisfaction { get; set; } // "customer_satisfaction"
    public string SalesRegion { get; set; }         // "sales_region"
}
```

---

### 8. Social Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/social/comments` | GET | `SocialComments.json` | Social comments |
| `/api/v1/antd/social/platforms` | GET | `SocialMedia.json` | Platform stats |
| `/api/v1/antd/social/posts/scheduled` | GET | `ScheduledPosts.json` | Scheduled posts |

#### SocialMedia.json Schema

```csharp
public class SocialMediaPlatformDto
{
    public string Id { get; set; }              // "id"
    public int Followers { get; set; }          // "followers"
    public int Following { get; set; }          // "following"
    public int Posts { get; set; }              // "posts"
    public int Likes { get; set; }              // "likes"
    public int Comments { get; set; }           // "comments"
    public decimal EngagementRate { get; set; } // "engagement_rate"
    public string Title { get; set; }           // "title": "facebook"|"twitter"|"instagram"|"linkedin"|"youtube"
}
```

#### ScheduledPosts.json Schema

```csharp
public class ScheduledPostDto
{
    public string Id { get; set; }              // "id"
    public string Title { get; set; }           // "title"
    public string Content { get; set; }         // "content"
    public string Date { get; set; }            // "date"
    public int Time { get; set; }               // "time"
    public string Author { get; set; }          // "author"
    public string Category { get; set; }        // "category"
    public string Tags { get; set; }            // "tags"
    public int LikesCount { get; set; }         // "likes_count"
    public int CommentsCount { get; set; }      // "comments_count"
    public int SharesCount { get; set; }        // "shares_count"
    public string ImageUrl { get; set; }        // "image_url" (base64)
    public string Link { get; set; }            // "link"
    public string Location { get; set; }        // "location"
    public string Hashtags { get; set; }        // "hashtags"
    public string Platform { get; set; }        // "platform": "Instagram"
}
```

---

### 9. Employees/HR Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/employees` | GET | `Employees.json` | List employees |
| `/api/v1/antd/employees/{id}` | GET | - | Get employee by ID |
| `/api/v1/antd/employees` | POST | - | Create employee |
| `/api/v1/antd/employees/{id}` | PUT | - | Update employee |
| `/api/v1/antd/employees/{id}` | DELETE | - | Delete employee |

#### Employees.json Schema

```csharp
public class EmployeeDto
{
    public string EmployeeId { get; set; }      // "employee_id"
    public string Title { get; set; }           // "title": "Mrs"|"Ms"|"Mr"|"Honorable"|"Dr"|"Rev"
    public string FirstName { get; set; }       // "first_name"
    public string MiddleName { get; set; }      // "middle_name"
    public string LastName { get; set; }        // "last_name"
    public string Avatar { get; set; }          // "avatar" (URL)
    public string Role { get; set; }            // "role"
    public int Age { get; set; }                // "age"
    public string Email { get; set; }           // "email"
    public string Country { get; set; }         // "country"
    public string FavoriteColor { get; set; }   // "favorite_color"
    public string HireDate { get; set; }        // "hire_date"
    public decimal Salary { get; set; }         // "salary"
}
```

---

### 10. Tasks Dashboard

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/tasks` | GET | `TasksList.json` | List all tasks |
| `/api/v1/antd/tasks/{id}` | GET | - | Get task by ID |
| `/api/v1/antd/tasks` | POST | - | Create task |
| `/api/v1/antd/tasks/{id}` | PUT | - | Update task |
| `/api/v1/antd/tasks/{id}` | DELETE | - | Delete task |
| `/api/v1/antd/tasks/{id}/status` | PATCH | - | Update task status |

#### TasksList.json Schema

```csharp
public class TaskDto
{
    public string Id { get; set; }              // "id"
    public string Name { get; set; }            // "name"
    public string Description { get; set; }     // "description"
    public string Priority { get; set; }        // "priority": "high"|"medium"|"low"
    public string DueDate { get; set; }         // "due_date"
    public string AssignedTo { get; set; }      // "assigned_to"
    public string Status { get; set; }          // "status": "in progress"|"completed"|"pending"
    public string Notes { get; set; }           // "notes"
    public string Category { get; set; }        // "category": "books"|"toys"|"sports"
    public int Duration { get; set; }           // "duration"
    public string CompletedDate { get; set; }   // "completed_date"
    public string Color { get; set; }           // "color"
}
```

---

### 11. Notifications

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/notifications` | GET | `Notifications.json` | List notifications |
| `/api/v1/antd/notifications/{id}` | GET | - | Get notification |
| `/api/v1/antd/notifications/{id}/read` | PATCH | - | Mark as read |
| `/api/v1/antd/notifications/{id}` | DELETE | - | Delete notification |

#### Notifications.json Schema

```csharp
public class NotificationDto
{
    public string NotificationId { get; set; }      // "notification_id"
    public string UserId { get; set; }              // "user_id"
    public string User { get; set; }                // "user"
    public string NotificationType { get; set; }    // "notification_type": "text"
    public string NotificationDate { get; set; }    // "notification_date"
    public string NotificationMessage { get; set; } // "notification_message"
    public bool IsRead { get; set; }                // "is_read"
    public bool IsDeleted { get; set; }             // "is_deleted"
    public string NotificationCategory { get; set; } // "notification_category"
    public string NotificationImage { get; set; }   // "notification_image" (URL)
    public string Color { get; set; }               // "color"
}
```

---

### 12. Timeline/Activity

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/timeline/activities` | GET | `TimelineActivity.json` | Activity feed |
| `/api/v1/antd/sessions/activity` | GET | `SessionActivity.json` | Session logs |

#### TimelineActivity.json Schema

```csharp
public class TimelineActivityDto
{
    public string UserId { get; set; }          // "user_id"
    public string ActivityType { get; set; }    // "activity_type": "like"|"comment"|"login"
    public string Timestamp { get; set; }       // "timestamp"
    public string PostId { get; set; }          // "post_id"
    public string PostContent { get; set; }     // "post_content"
    public int CommentId { get; set; }          // "comment_id"
    public string CommentContent { get; set; }  // "comment_content"
    public int LikeCount { get; set; }          // "like_count"
    public string Location { get; set; }        // "location"
    public string DeviceType { get; set; }      // "device_type"
}
```

#### SessionActivity.json Schema

```csharp
public class SessionActivityDto
{
    public string Id { get; set; }              // "id"
    public string LoginTime { get; set; }       // "login_time"
    public string LoginLocation { get; set; }   // "login_location"
    public string DeviceType { get; set; }      // "device_type": "tablet"|"mobile"|"desktop"
    public string Browser { get; set; }         // "browser": "Firefox"|"Chrome"
    public string IpAddress { get; set; }       // "ip_address"
    public string SessionType { get; set; }     // "session_type"
    public string Status { get; set; }          // "status": "suspended"|"locked"|"active"
    public int LoginDuration { get; set; }      // "login_duration"
    public int LoginAttempts { get; set; }      // "login_attempts"
}
```

---

### 13. Company/Channels

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/company/users` | GET | `CompanyUsers.json` | Company user stats |
| `/api/v1/antd/channels/users` | GET | `ChannelUsers.json` | Channel users |

#### CompanyUsers.json Schema

```csharp
public class CompanyUserDto
{
    public string Id { get; set; }              // "id"
    public string Company { get; set; }         // "company"
    public int Users { get; set; }              // "users"
    public decimal Percentage { get; set; }     // "percentage"
}
```

---

### 14. FAQs & Pricing

| Endpoint | Method | JSON Source | Description |
|----------|--------|-------------|-------------|
| `/api/v1/antd/faqs` | GET | `Faqs.json` | List FAQs |
| `/api/v1/antd/faqs/{id}` | GET | - | Get FAQ by ID |
| `/api/v1/antd/pricing/plans` | GET | `Pricing.json` | Pricing plans |
| `/api/v1/antd/pricing/licenses` | GET | `License.json` | License info |

#### Faqs.json Schema

```csharp
public class FaqDto
{
    public string Id { get; set; }              // "id"
    public string Question { get; set; }        // "question"
    public string Answer { get; set; }          // "answer"
    public string Category { get; set; }        // "category": "Payment"|"Shipping"|"Account"
    public string DateCreated { get; set; }     // "date_created"
    public bool IsFeatured { get; set; }        // "is_featured"
    public int Views { get; set; }              // "views"
    public List<string> RelatedFaqs { get; set; } // "related_faqs"
    public string Tags { get; set; }            // "tags"
    public decimal Rating { get; set; }         // "rating"
    public string Author { get; set; }          // "author"
}
```

#### Pricing.json Schema

```csharp
public class PricingPlanDto
{
    public string Plan { get; set; }            // "plan": "free"|"pro"|"enterprise"
    public decimal Monthly { get; set; }        // "monthly"
    public decimal Annually { get; set; }       // "annually"
    public string SavingsCaption { get; set; }  // "savings_caption"
    public List<string> Features { get; set; }  // "features"
    public string Color { get; set; }           // "color"
    public bool? Preferred { get; set; }        // "preferred"
}
```

---

## Implementation Checklist

### Phase 1: Core Setup
- [ ] Create folder structure (`Controllers/Antd`, `Dtos/Antd`, etc.)
- [ ] Create `AntdBaseController.cs` if not exists
- [ ] Register services in `Program.cs`
- [ ] Add DbContext configurations for new entities

### Phase 2: Entities & Migrations
- [ ] Create all entity classes in `Entities/Antd/`
- [ ] Add DbSets to `ApplicationDbContext`
- [ ] Generate EF Core migrations
- [ ] Create seed data from JSON files

### Phase 3: DTOs & Interfaces
- [ ] Create all DTO classes in `Dtos/Antd/`
- [ ] Create service interfaces in `Interfaces/Antd/`
- [ ] Create response wrapper classes

### Phase 4: Services
- [ ] Implement all services in `Services/Antd/`
- [ ] Add pagination support
- [ ] Add filtering/search support
- [ ] Add sorting support

### Phase 5: Controllers
- [ ] Implement all controllers with CRUD operations
- [ ] Add authorization attributes
- [ ] Add API documentation attributes
- [ ] Add input validation

### Phase 6: Testing & Documentation
- [ ] Write unit tests for services
- [ ] Write integration tests for endpoints
- [ ] Update Swagger/OpenAPI documentation
- [ ] Test with frontend application

---

## API Versioning

All Antd dashboard endpoints use:
- **Base URL**: `/api/v1/antd/`
- **Version**: v1
- **Format**: JSON
- **Authentication**: JWT Bearer token
- **Authorization**: Permission-based (e.g., `Antd.Auction.View`, `Antd.Tasks.Create`)

---

## Complete Endpoints Summary

| # | Controller | Endpoints | JSON Files |
|---|------------|-----------|------------|
| 1 | AuctionController | 3 | 2 |
| 2 | BiddingController | 2 | 2 |
| 3 | CampaignsController | 6 | 2 |
| 4 | ProjectsController | 6 | 2 |
| 5 | LearningController | 6 | 5 |
| 6 | LogisticsController | 5 | 4 |
| 7 | OrdersController | 2 | 2 |
| 8 | ProductsController | 3 | 3 |
| 9 | SocialController | 3 | 3 |
| 10 | EmployeesController | 5 | 1 |
| 11 | TasksController | 6 | 1 |
| 12 | NotificationsController | 4 | 1 |
| 13 | TimelineController | 2 | 2 |
| 14 | CompanyController | 2 | 2 |
| 15 | FaqsController | 4 | 3 |
| **Total** | **15 Controllers** | **59 Endpoints** | **35 JSON Files** |

---

## Notes

1. **Image Handling**: Several JSON files contain base64-encoded images. Consider:
   - Storing images in blob storage (Azure Blob, AWS S3)
   - Using separate `/api/v1/antd/files/{id}` endpoint for image retrieval
   - Converting base64 to URLs during migration

2. **Date Formats**: JSON files use string dates. Entity properties should use `DateTime` with proper conversion.

3. **Large Files**: `Projects.json` (~800KB) and `TopProducts.json` (~170KB) require:
   - Mandatory pagination
   - Efficient database indexing
   - Consider caching for frequently accessed data

4. **Permissions**: Create permission set for Antd dashboard:
   - `Antd.{Resource}.View`
   - `Antd.{Resource}.Create`
   - `Antd.{Resource}.Update`
   - `Antd.{Resource}.Delete`

---

*Generated for antd-multipurpose-dashboard backend implementation*
