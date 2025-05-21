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
├── docs/                  # Assessment documentation
│   ├── api-spec.md        # API specifications
│   ├── database-schema.md # Database schema design
│   ├── allocation-algorithm.md # Algorithm requirements
│   └── bonus-tasks.md     # Optional bonus tasks
├── docker-compose.yml     # Docker Compose configuration (skeleton)
└── .github/               # GitHub Actions workflows (skeleton)
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

3. Create a `.env` file with the following variables (see `.env.example` for template):
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

3. Create a `.env.local` file with the following variables (see `.env.example` for template):
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

See [allocation-algorithm.md](./docs/allocation-algorithm.md) for detailed requirements.

### 2. Financial Data Modeling & Storage

Design an efficient data model for transactions, goals, and allocations with:

- Proper TypeScript interfaces/types
- Efficient MongoDB schemas with indexes
- Clean repository pattern implementation

See [database-schema.md](./docs/database-schema.md) for guidance.

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

## About Starter Code

This repository provides a foundation with basic functionality and skeletons for key components:

- **Complete**: Authentication system, database models, API routes structure, component layouts
- **Incomplete by Design**: Key algorithmic implementations, component logic, state management - these are what you'll need to implement as part of the assessment

The incomplete parts are marked with comments like `// TODO:` or placeholder implementations that you should replace with your own code. This allows you to focus on the core technical challenges rather than boilerplate setup.

## API Reference

See [api-spec.md](./docs/api-spec.md) for detailed API specifications.

## Bonus Tasks

After completing the core requirements, consider tackling one or more of the bonus tasks:

- Containerization with Docker
- CI/CD pipeline with GitHub Actions
- Advanced authentication features
- Comprehensive testing
- Real-time updates with WebSockets

See [bonus-tasks.md](./docs/bonus-tasks.md) for details on these bonus challenges.

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
4. Include any additional notes or documentation in your README

## Evaluation Criteria

Your submission will be evaluated based on:

1. **Code Quality & Design** (40%)
   - Clear separation of concerns
   - Effective use of design patterns
   - Clean, maintainable code
   - Thoughtful abstractions and interfaces

2. **Problem-Solving Approach** (25%)
   - Solution to the allocation algorithm
   - Handling of edge cases
   - Performance considerations
   - Algorithm complexity and efficiency

3. **Data Structure Implementation** (20%)
   - Appropriate model design
   - Efficient querying and filtering
   - Relationship management
   - TypeScript type definitions

4. **Code Reusability** (15%)
   - Component API design
   - Module organization
   - Documentation
   - Extensibility

Good luck!