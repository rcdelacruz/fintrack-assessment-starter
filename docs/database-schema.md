# FinTrack Database Schema

This document provides the database schema for the FinTrack assessment. The schema is designed for MongoDB with Mongoose, but the concepts can be adapted to other database systems if preferred.

## User Schema

```typescript
interface User {
  _id: ObjectId;
  email: string;              // Unique, required
  passwordHash: string;       // Required
  firstName: string;          // Required
  lastName: string;           // Required
  createdAt: Date;
  updatedAt: Date;
}
```

## Transaction Schema

```typescript
interface Transaction {
  _id: ObjectId;
  userId: ObjectId;           // Reference to User
  date: Date;                 // Required
  merchant: string;           // Required
  amount: number;             // Required (positive for income, negative for expense)
  type: 'income' | 'expense' | 'transfer';  // Required
  category: string;           // Required
  description: string;        // Optional
  status: 'completed' | 'pending' | 'failed';  // Required
  createdAt: Date;
  updatedAt: Date;
}
```

## Goal Schema

```typescript
interface Goal {
  _id: ObjectId;
  userId: ObjectId;           // Reference to User
  name: string;               // Required
  targetAmount: number;       // Required
  currentAmount: number;      // Required, defaults to 0
  startDate: Date;            // Required, defaults to creation date
  targetDate: Date;           // Required
  priority: 'high' | 'medium' | 'low';  // Required
  category: string;           // Required
  status: 'active' | 'completed' | 'behind' | 'ahead' | 'paused';  // Required
  createdAt: Date;
  updatedAt: Date;
}
```

## Allocation Schema

```typescript
interface Allocation {
  _id: ObjectId;
  userId: ObjectId;           // Reference to User
  goalId: ObjectId;           // Reference to Goal
  amount: number;             // Required
  source: string;             // Optional (e.g. "Salary", "Bonus")
  transactionId: ObjectId;    // Optional reference to Transaction
  date: Date;                 // Required
  createdAt: Date;
}
```

## Indexes

For optimal performance, consider adding the following indexes:

### Transaction Indexes

```javascript
// User-specific queries
db.transactions.createIndex({ userId: 1, date: -1 });
db.transactions.createIndex({ userId: 1, type: 1 });
db.transactions.createIndex({ userId: 1, category: 1 });

// Text search for merchant and description
db.transactions.createIndex(
  { merchant: "text", description: "text" },
  { weights: { merchant: 3, description: 1 } }
);
```

### Goal Indexes

```javascript
db.goals.createIndex({ userId: 1, status: 1 });
db.goals.createIndex({ userId: 1, targetDate: 1 });
db.goals.createIndex({ userId: 1, priority: 1 });
```

### Allocation Indexes

```javascript
db.allocations.createIndex({ userId: 1, goalId: 1 });
db.allocations.createIndex({ goalId: 1, date: -1 });
```

## Sample Document

### Sample Transaction

```json
{
  "_id": "ObjectId()",
  "userId": "ObjectId()",
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

### Sample Goal

```json
{
  "_id": "ObjectId()",
  "userId": "ObjectId()",
  "name": "Emergency Fund",
  "targetAmount": 100000,
  "currentAmount": 25000,
  "startDate": "2025-01-01T00:00:00Z",
  "targetDate": "2025-12-31T00:00:00Z",
  "priority": "high",
  "category": "Savings",
  "status": "active",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-05-15T00:00:00Z"
}
```

### Sample Allocation

```json
{
  "_id": "ObjectId()",
  "userId": "ObjectId()",
  "goalId": "ObjectId()",
  "amount": 5000,
  "source": "Salary",
  "date": "2025-05-01T10:30:00Z",
  "createdAt": "2025-05-01T10:30:00Z"
}
```

## Relationships

- Each Transaction belongs to a User (via `userId`)
- Each Goal belongs to a User (via `userId`)
- Each Allocation belongs to a User (via `userId`) and a Goal (via `goalId`)
- An Allocation can optionally be linked to a Transaction (via `transactionId`)