# FinTrack API Specification

This document outlines the core API endpoints to implement for the FinTrack assessment. Your implementation should follow RESTful principles and include appropriate error handling, validation, and security measures.

## API Base URL

```
/api/v1
```

## Authentication Endpoints

### Register User

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2025-05-20T14:30:00Z"
}
```

### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Transaction Endpoints

### Get All Transactions

```
GET /transactions
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `type`: Filter by transaction type (income, expense, transfer)
- `startDate`: Filter by start date (YYYY-MM-DD)
- `endDate`: Filter by end date (YYYY-MM-DD)
- `search`: Search term for merchant or description
- `sortBy`: Field to sort by (date, amount, merchant)
- `sortOrder`: Sort order (asc, desc)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "tx_id_1",
      "date": "2025-05-01T10:30:00Z",
      "merchant": "Payroll - ABC Company",
      "amount": 35000,
      "type": "income",
      "category": "Salary",
      "description": "Monthly salary deposit",
      "status": "completed",
      "createdAt": "2025-05-01T10:30:00Z",
      "updatedAt": "2025-05-01T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 35,
    "page": 1,
    "limit": 20,
    "pages": 2
  }
}
```

### Get Transaction by ID

```
GET /transactions/:id
```

**Response (200 OK):**
```json
{
  "id": "tx_id_1",
  "date": "2025-05-01T10:30:00Z",
  "merchant": "Payroll - ABC Company",
  "amount": 35000,
  "type": "income",
  "category": "Salary",
  "description": "Monthly salary deposit",
  "status": "completed",
  "createdAt": "2025-05-01T10:30:00Z",
  "updatedAt": "2025-05-01T10:30:00Z"
}
```

### Create Transaction

```
POST /transactions
```

**Request Body:**
```json
{
  "date": "2025-05-21T15:00:00Z",
  "merchant": "Starbucks",
  "amount": -450,
  "type": "expense",
  "category": "Food",
  "description": "Coffee with colleagues",
  "status": "completed"
}
```

**Response (201 Created):**
```json
{
  "id": "new_tx_id",
  "date": "2025-05-21T15:00:00Z",
  "merchant": "Starbucks",
  "amount": -450,
  "type": "expense",
  "category": "Food",
  "description": "Coffee with colleagues",
  "status": "completed",
  "createdAt": "2025-05-21T15:00:00Z",
  "updatedAt": "2025-05-21T15:00:00Z"
}
```

### Update Transaction

```
PUT /transactions/:id
```

**Request Body:**
```json
{
  "amount": -550,
  "description": "Coffee and sandwich with colleagues"
}
```

**Response (200 OK):**
```json
{
  "id": "tx_id",
  "date": "2025-05-21T15:00:00Z",
  "merchant": "Starbucks",
  "amount": -550,
  "type": "expense",
  "category": "Food",
  "description": "Coffee and sandwich with colleagues",
  "status": "completed",
  "createdAt": "2025-05-21T15:00:00Z",
  "updatedAt": "2025-05-21T15:30:00Z"
}
```

### Delete Transaction

```
DELETE /transactions/:id
```

**Response (204 No Content)**

## Goals Endpoints

### Get All Goals

```
GET /goals
```

**Query Parameters:**
- `status`: Filter by goal status (active, completed, behind, ahead, paused)
- `sortBy`: Field to sort by (targetDate, priority, currentAmount, etc.)
- `sortOrder`: Sort order (asc, desc)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "goal_id_1",
      "name": "Vacation",
      "targetAmount": 5000,
      "currentAmount": 1500,
      "startDate": "2025-01-01T00:00:00Z",
      "targetDate": "2025-12-31T00:00:00Z",
      "priority": "high",
      "category": "Travel",
      "status": "active",
      "progress": 30,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-05-10T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

### Create Goal

```
POST /goals
```

**Request Body:**
```json
{
  "name": "New Car",
  "targetAmount": 20000,
  "targetDate": "2026-12-31T00:00:00Z",
  "priority": "medium",
  "category": "Vehicle"
}
```

**Response (201 Created):**
```json
{
  "id": "goal_id_3",
  "name": "New Car",
  "targetAmount": 20000,
  "currentAmount": 0,
  "startDate": "2025-05-21T00:00:00Z",
  "targetDate": "2026-12-31T00:00:00Z",
  "priority": "medium",
  "category": "Vehicle",
  "status": "active",
  "progress": 0,
  "createdAt": "2025-05-21T00:00:00Z",
  "updatedAt": "2025-05-21T00:00:00Z"
}
```

## Allocation Endpoints

### Allocate Funds

```
POST /allocations
```

**Request Body:**
```json
{
  "amount": 1000,
  "strategy": "priority",
  "constraints": {
    "minimumAllocation": 100,
    "maximumPerGoal": 5000
  }
}
```

**Response (201 Created):**
```json
{
  "totalAllocated": 1000,
  "allocations": [
    {
      "id": "alloc_id_5",
      "goalId": "goal_id_1",
      "amount": 600,
      "createdAt": "2025-05-21T00:00:00Z"
    },
    {
      "id": "alloc_id_6",
      "goalId": "goal_id_2",
      "amount": 400,
      "createdAt": "2025-05-21T00:00:00Z"
    }
  ]
}
```

## Authentication & Security

All endpoints except `/auth/login` and `/auth/register` require authentication via a JWT token sent in the `Authorization` header:

```
Authorization: Bearer jwt_token_here
```