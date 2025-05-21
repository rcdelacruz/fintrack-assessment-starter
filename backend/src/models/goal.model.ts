import mongoose, { Document } from 'mongoose';

export type GoalPriority = 'high' | 'medium' | 'low';
export type GoalStatus = 'active' | 'completed' | 'behind' | 'ahead' | 'paused';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  targetDate: Date;
  priority: GoalPriority;
  category: string;
  status: GoalStatus;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new mongoose.Schema<IGoal>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'behind', 'ahead', 'paused'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
goalSchema.index({ userId: 1, status: 1 });
goalSchema.index({ userId: 1, targetDate: 1 });
goalSchema.index({ userId: 1, priority: 1 });

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);