import { Schema, model } from 'mongoose';

const tripSchema = new Schema({
  userId: { type: String, required: true },
  origin: {
    lat: Number,
    lng: Number,
    address: String
  },
  destination: {
    lat: Number,
    lng: Number,
    address: String
  },
  status: { 
    type: String, 
    enum: ['SEARCHING', 'ASSIGNED', 'COMPLETED', 'CANCELLED'], 
    default: 'SEARCHING' 
  },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', default: null },
  createdAt: { type: Date, default: Date.now },
  assignedAt: { type: Date }
});

export const Trip = model('Trip', tripSchema);