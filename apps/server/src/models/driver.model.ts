import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicle: {
    model: String,
    plate: String,
    color: String
  },
  // GeoJSON para coordenadas [lng, lat]
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'BUSY', 'OFFLINE'], 
    default: 'AVAILABLE' 
  }
});

// Índice vital para que funcione el $near
driverSchema.index({ location: '2dsphere' });

export const Driver = model('Driver', driverSchema);