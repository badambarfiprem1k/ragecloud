# RageCloud API Documentation

## Overview

The RageCloud API provides a complete REST interface for managing products, categories, orders, and user data. All data is stored in Supabase and accessed through Next.js API routes.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication via Supabase Auth tokens. Pass the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Admin endpoints require the user to have `is_admin = true` in the `users` table.

---

## Products

### List Products

Get all public (non-hidden, non-archived) products with pagination and filtering.

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `category` (string): Filter by category slug
- `search` (string): Search by product name or description
- `featured` (boolean): Filter featured products only
- `limit` (number): Items per page (default: 12)
- `offset` (number): Pagination offset (default: 0)

**Example:**
```bash
curl "http://localhost:3000/api/products?category=plugins&limit=12&offset=0"
```

**Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Ultimate Teleport Plugin",
      "slug": "ultimate-teleport-plugin",
      "description": "...",
      "price": 29.99,
      "discount_price": null,
      "category_id": "uuid",
      "featured": false,
      "coming_soon": false,
      "hidden": false,
      "downloads": 1250,
      "rating": 4.9,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 15,
  "limit": 12,
  "offset": 0
}
```

---

### Get Single Product

Get a product by ID or slug.

**Endpoint:** `GET /api/products/[id]`

**Parameters:**
- `id` (string): Product ID or slug

**Response:**
```json
{
  "id": "uuid",
  "name": "Ultimate Teleport Plugin",
  "slug": "ultimate-teleport-plugin",
  "description": "...",
  "short_description": "...",
  "price": 29.99,
  "discount_price": null,
  "category_id": "uuid",
  "thumbnail_url": "...",
  "banner_url": "...",
  "gallery_urls": ["...", "..."],
  "version": "1.0.0",
  "compatibility": "1.20+",
  "tags": ["spigot", "paper", "teleport"],
  "featured": false,
  "coming_soon": false,
  "hidden": false,
  "downloads": 1250,
  "views": 5000,
  "rating": 4.9,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

**Note:** Each call increments the `views` counter.

---

### Create Product

Create a new product (admin only).

**Endpoint:** `POST /api/products`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Ultimate Teleport Plugin",
  "slug": "ultimate-teleport-plugin",
  "description": "Advanced teleportation system...",
  "short_description": "Advanced teleportation system with warps and homes",
  "category_id": "uuid",
  "price": 29.99,
  "discount_price": null,
  "version": "1.0.0",
  "compatibility": "1.20+",
  "tags": ["spigot", "paper"]
}
```

**Response:** (201 Created)
```json
{
  "id": "uuid",
  "name": "Ultimate Teleport Plugin",
  "slug": "ultimate-teleport-plugin",
  ...
}
```

---

### Update Product

Update a product (admin only).

**Endpoint:** `PUT /api/products/[id]`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (same as create, any field can be updated)

**Response:**
```json
{
  "id": "uuid",
  ...
}
```

---

### Delete Product

Delete a product (admin only).

**Endpoint:** `DELETE /api/products/[id]`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true
}
```

---

## Categories

### List Categories

Get all categories, sorted by order.

**Endpoint:** `GET /api/categories`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Plugins",
    "slug": "plugins",
    "description": "Spigot and Paper plugins",
    "icon": "package",
    "color": "#8B5CF6",
    "sort_order": 1,
    "created_at": "2026-01-01T00:00:00Z"
  }
]
```

---

### Create Category

Create a new category (admin only).

**Endpoint:** `POST /api/categories`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Plugins",
  "slug": "plugins",
  "description": "Spigot and Paper plugins",
  "icon": "package",
  "color": "#8B5CF6",
  "sort_order": 1
}
```

**Response:** (201 Created)
```json
{
  "id": "uuid",
  "name": "Plugins",
  ...
}
```

---

## Error Responses

All errors follow this format:

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**403 Forbidden:**
```json
{
  "error": "Forbidden - Admin access required"
}
```

**404 Not Found:**
```json
{
  "error": "Product not found"
}
```

**400 Bad Request:**
```json
{
  "error": "Invalid input or duplicate entry"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## Data Models

### Product
- `id` (UUID)
- `name` (string)
- `slug` (string, unique)
- `description` (text)
- `short_description` (string)
- `category_id` (UUID)
- `price` (decimal)
- `discount_price` (decimal)
- `banner_url` (string)
- `thumbnail_url` (string)
- `gallery_urls` (string[])
- `version` (string)
- `compatibility` (string)
- `tags` (string[])
- `featured` (boolean)
- `coming_soon` (boolean)
- `hidden` (boolean)
- `archived` (boolean)
- `downloads` (integer)
- `views` (integer)
- `rating` (decimal)
- `created_by` (UUID)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Category
- `id` (UUID)
- `name` (string, unique)
- `slug` (string, unique)
- `description` (text)
- `icon` (string)
- `color` (string)
- `sort_order` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Order
- `id` (UUID)
- `order_number` (string, unique)
- `user_id` (UUID)
- `total_amount` (decimal)
- `discount_amount` (decimal)
- `tax_amount` (decimal)
- `razorpay_order_id` (string)
- `razorpay_payment_id` (string)
- `payment_status` (string)
- `status` (string)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### User
- `id` (UUID)
- `email` (string)
- `full_name` (string)
- `avatar_url` (string)
- `is_admin` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## Upcoming Endpoints

The following endpoints are being built:

- POST `/api/cart` - Add to cart
- GET `/api/cart` - Get user's cart
- DELETE `/api/cart/[productId]` - Remove from cart
- POST `/api/orders` - Create order
- GET `/api/orders` - Get user's orders
- POST `/api/reviews` - Leave review
- GET `/api/reviews/[productId]` - Get product reviews
- POST `/api/wishlist` - Add to wishlist
- GET `/api/wishlist` - Get user's wishlist
- POST `/api/auth/register` - Sign up
- POST `/api/auth/login` - Login
- POST `/api/admin/products/[id]/upload` - Upload product files
- POST `/api/admin/analytics` - Get analytics

---

## Security

- All endpoints validate authentication and authorization
- Admin endpoints check `is_admin` flag
- Row-level security (RLS) policies enforce data isolation
- Users can only access their own data
- API keys and sensitive data never exposed to frontend

---

## Rate Limiting

Currently no rate limiting. Will be added before production.

---

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
