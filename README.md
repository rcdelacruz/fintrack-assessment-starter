# FinTrack Assessment - Starter Code

This repository contains starter code for the FinTrack technical assessment. It provides a foundation for building a financial transaction dashboard with goal management and a smart allocation algorithm.

## Assessment Overview

This assessment focuses on evaluating your technical skills in:
1. **Problem-solving** - Implementing a smart financial allocation algorithm
2. **Data structure knowledge** - Designing efficient models and queries
3. **Design pattern implementation** - Applying appropriate software patterns
4. **Code reusability** - Creating maintainable, modular components

## Repository Structure

```
fintrack-assessment-starter/
├── backend/               # Node.js + Express + TypeScript backend
├── frontend/              # Next.js frontend application
├── sample-data/           # Sample JSON data for development
└── docs/                  # Assessment documentation
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/fintrack
   JWT_SECRET=your_secret_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Core Technical Challenges

### 1. Smart Financial Allocation System

Implement an algorithm that intelligently allocates incoming funds across multiple financial goals based on priority, timeline, and progress. This requires:

- Implementing the Strategy Pattern for different allocation approaches
- Creating efficient algorithms for fund distribution
- Handling edge cases and constraints

### 2. Financial Data Modeling & Storage

Design an efficient data model for transactions, goals, and allocations with:

- Proper TypeScript interfaces/types
- Efficient MongoDB schemas with indexes
- Clean repository pattern implementation

### 3. Dashboard State Management

Implement a maintainable state management solution that:

- Handles complex filtering and sorting state
- Manages loading, error, and success states
- Provides a clean API for components

### 4. Reusable Financial Component Library

Create reusable, well-designed components for:

- Transaction management
- Goal tracking and visualization
- Financial summaries

## Assessment Requirements

- Complete the core technical challenges
- Follow good coding practices (comments, testing, etc.)
- Document your design decisions in the README
- Submit your solution within the deadline

## Testing

Run backend tests:
```
cd backend
npm test
```

Run frontend tests:
```
cd frontend
npm test
```

## Submission Instructions

When you've completed the assessment:

1. Push your code to a private GitHub repository
2. Add the reviewer as a collaborator
3. Email the repository link to the provided address

## Resources

- [Backend API Documentation](./docs/api-spec.md)
- [Database Schema Documentation](./docs/database-schema.md)
- [Allocation Algorithm Requirements](./docs/allocation-algorithm.md)

Good luck!