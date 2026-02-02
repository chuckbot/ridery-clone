import mongoose from 'mongoose';
// Ajustamos la ruta para que apunte a tu modelo de Mongoose
import { Driver } from '../apps/server/src/models/driver.model.js'; 

const MONGO_URI = 'mongodb://localhost:27017/ridery';

const drivers = [
  {
    name: "Juan Perez (Cerca de Plaza Falcón)",
    phone: "+584121234567", // Campo requerido añadido
    status: "AVAILABLE",
    vehicle: { model: "Toyota Corolla", plate: "ABC123D", color: "Blanco" },
    location: { type: "Point", coordinates: [-69.6732, 11.4111] }
  },
  {
    name: "Maria Garcia (Paseo Talavera)",
    phone: "+584149876543", 
    status: "AVAILABLE",
    vehicle: { model: "Ford Fiesta", plate: "XYZ789E", color: "Azul" },
    location: { type: "Point", coordinates: [-69.6775, 11.4125] }
  },
  {
    name: "Carlos Lopez (Av. Los Médanos)",
    phone: "+584245556677",
    status: "AVAILABLE",
    vehicle: { model: "Honda Civic", plate: "GHI456F", color: "Gris" },
    location: { type: "Point", coordinates: [-69.6650, 11.4080] }
  },
  {
    name: "Ana Rodriguez (C.C. Costa Azul)",
    phone: "+584225557678",
    status: "AVAILABLE",
    vehicle: { model: "Chevrolet Aveo", plate: "JKL012G", color: "Rojo" },
    location: { type: "Point", coordinates: [-69.6850, 11.4200] }
  },
  {
    name: "Pedro Martinez (La Velita)",
    phone: "+584125556668",
    status: "AVAILABLE",
    vehicle: { model: "Hyundai Accent", plate: "MNO345H", color: "Negro" },
    location: { type: "Point", coordinates: [-69.7000, 11.3950] }
  }
];

async function seed() {
  try {
    console.log("⏳ Conectando a MongoDB vía Mongoose...");
    await mongoose.connect(MONGO_URI);
    
    // 1. Limpiamos la colección usando el modelo
    await Driver.deleteMany({}); 
    
    // 2. Insertamos la data
    // Mongoose creará el índice 2dsphere automáticamente si está en el esquema
    await Driver.insertMany(drivers);
    
    console.log("✅ Conductores de Coro insertados exitosamente");
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();