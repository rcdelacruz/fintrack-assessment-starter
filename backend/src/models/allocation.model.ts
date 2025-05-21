import mongoose, { Document } from 'mongoose';

export interface IAllocation extends Document {
  userId: mongoose.Types.ObjectId;
  goalId: mongoose.Types.ObjectId;
  amount: number;
  source?: string;
  transactionId?: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
}

const allocationSchema = new mongoose.Schema<IAllocation>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    source: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
allocationSchema.index({ userId: 1, goalId: 1 });
allocationSchema.index({ goalId: 1, date: -1 });

export const Allocation = mongoose.model<IAllocation>('Allocation', allocationSchema);