// src/services/servicios.ts
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Función para obtener categorías desde Firestore
export async function getCategorias() {
  try {
    // Referencia a la colección en Firestore
    const categoriasRef = collection(db, 'categorias_servicios');
    
    // Creamos la consulta ordenada por nombre
    const q = query(categoriasRef, orderBy('nombre'));
    
    // Obtenemos los documentos
    const querySnapshot = await getDocs(q);
    
    // Mapeamos los datos con su ID de documento
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw new Error("No se pudieron cargar las categorías.");
  }
}