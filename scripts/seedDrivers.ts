import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017/ridery';

const drivers = [
  {
    name: "Juan Perez (Cerca de Plaza Falcón)",
    status: "AVAILABLE",
    location: { type: "Point", coordinates: [-69.6732, 11.4111] } // Plaza Falcón
  },
  {
    name: "Maria Garcia (Paseo Talavera)",
    status: "AVAILABLE",
    location: { type: "Point", coordinates: [-69.6775, 11.4125] } // Paseo Talavera
  },
  {
    name: "Carlos Lopez (Av. Los Médanos)",
    status: "AVAILABLE",
    location: { type: "Point", coordinates: [-69.6650, 11.4080] } // Av. Los Médanos
  },
  {
    name: "Ana Rodriguez (C.C. Costa Azul)",
    status: "AVAILABLE",
    location: { type: "Point", coordinates: [-69.6850, 11.4200] } // C.C. Costa Azul
  },
  {
    name: "Pedro Martinez (La Velita)",
    status: "AVAILABLE",
    location: { type: "Point", coordinates: [-69.7000, 11.3950] } // La Velita
  }
];

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db();
    
    // 1. Aseguramos el índice (por si acaso)
    await db.collection('drivers').createIndex({ location: "2dsphere" });
    
    // 2. Insertamos la data
    await db.collection('drivers').deleteMany({}); // Limpiamos antes de insertar
    await db.collection('drivers').insertMany(drivers);
    
    console.log("✅ Conductores de Coro insertados exitosamente");
  } finally {
    await client.close();
  }
}

seed();