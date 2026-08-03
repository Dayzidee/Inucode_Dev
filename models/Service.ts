import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  category: string;
  icon: string;
  color: string;
  hoverEffect: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    hoverEffect: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
