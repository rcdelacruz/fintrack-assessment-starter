# Allocation Algorithm Requirements

## Overview

The core technical challenge of this assessment is to implement a smart financial allocation system that distributes funds across multiple financial goals based on various criteria. This document outlines the requirements and specifications for this algorithm.

## Allocation Strategies

Your implementation should support multiple allocation strategies using the Strategy Pattern:

### 1. Priority-Based Allocation

Distributes funds based on the priority level of goals:

- High priority goals receive funds first
- If there are multiple goals with the same priority, funds are distributed proportionally based on progress (goals further from completion get more)
- Once all high priority goals are satisfied, remaining funds flow to medium and then low priority goals

### 2. Timeline-Based Allocation

Distributes funds based on the timeline/target date of goals:

- Goals with closer target dates receive more funds
- Distribution should be weighted by both proximity to deadline and current progress
- The algorithm should ensure goals stay on track for their target dates

### 3. Balanced Allocation

Distributes funds evenly across all goals, but with some intelligent weighting:

- All goals receive some allocation
- Distribution is adjusted based on both priority and timeline
- Goals that are behind schedule receive a higher percentage

## Algorithm Requirements

### Input Parameters

The algorithm should accept the following inputs:

```typescript
interface AllocationInput {
  amount: number;              // Total amount to allocate
  goals: Goal[];               // Array of goals to allocate funds to
  strategy: 'priority' | 'timeline' | 'balanced';  // Strategy to use
  constraints?: {              // Optional constraints
    minimumAllocation?: number;  // Minimum amount to allocate to a goal
    maximumPerGoal?: number;     // Maximum amount to allocate to a single goal
    excludeGoals?: string[];     // IDs of goals to exclude from allocation
  };
}
```

### Output Format

The algorithm should return the following output:

```typescript
interface AllocationResult {
  allocations: {
    goalId: string;           // ID of the goal
    amount: number;           // Amount allocated to this goal
    percentage: number;       // Percentage of the total amount
  }[];
  totalAllocated: number;     // Total amount allocated (may be less than input if constraints applied)
  remainingAmount: number;    // Unallocated amount (if any)
}
```

### Constraint Handling

The algorithm must handle the following constraints:

1. **Minimum Allocation**: If specified, each goal should receive either zero or at least the minimum allocation amount.
2. **Maximum Per Goal**: No goal should receive more than this maximum amount in a single allocation.
3. **Goal Exclusions**: Goals in the exclude list should not receive any allocation.
4. **Completion Handling**: If an allocation would cause a goal to exceed its target amount, the excess should be reallocated to other goals.

### Edge Cases

Your implementation should handle these edge cases:

1. **Insufficient Funds**: If the total amount is less than the sum of minimum allocations for all eligible goals.
2. **Single Goal**: If there's only one eligible goal, it receives the entire amount (up to its remaining target and any maximum constraint).
3. **No Eligible Goals**: If there are no eligible goals, the algorithm should return an empty allocation list.
4. **Rounding**: Handle rounding appropriately to ensure the sum of allocations equals the total amount.

## Implementation Guidelines

1. Use the Strategy Pattern to implement different allocation strategies.
2. Make your code modular and extensible to support additional strategies in the future.
3. Include comprehensive unit tests for the algorithm and each strategy.
4. Optimize for both correctness and performance.
5. Document your implementation approach and any assumptions.

## Example Scenarios

### Scenario 1: Priority-Based Allocation

**Input:**
- Amount: $1,000
- Goals:
  - Emergency Fund: $10,000 target, $2,000 current, high priority
  - Vacation: $5,000 target, $1,000 current, medium priority
  - New Laptop: $2,000 target, $500 current, low priority
- Strategy: priority
- Constraints: { minimumAllocation: $100 }

**Expected Output:**
- Emergency Fund: $1,000 (100%)
- Vacation: $0 (0%)
- New Laptop: $0 (0%)

### Scenario 2: Timeline-Based Allocation

**Input:**
- Amount: $1,000
- Goals:
  - Emergency Fund: Target date 12 months away, 20% complete
  - Vacation: Target date 3 months away, 20% complete
  - New Laptop: Target date 6 months away, 25% complete
- Strategy: timeline
- Constraints: { minimumAllocation: $100 }

**Expected Output:**
- Emergency Fund: $200 (20%)
- Vacation: $600 (60%)
- New Laptop: $200 (20%)

### Scenario 3: Balanced Allocation

**Input:**
- Amount: $1,000
- Goals: Same as above
- Strategy: balanced
- Constraints: { minimumAllocation: $100 }

**Expected Output:**
- Emergency Fund: $450 (45%)
- Vacation: $350 (35%)
- New Laptop: $200 (20%)

These are example outputs - your algorithm may produce slightly different allocations as long as they follow the strategy's principles and satisfy the constraints.