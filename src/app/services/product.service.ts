import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // <-- Esto es crucial para la inyección
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor() { }

  async createProduct(productData: any): Promise<any> {
    const dataWithImage = {
      ...productData,
      images: ["https://example.com"]  // Imagen hardcodeada
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithImage)
      });

      if (!response.ok) throw new Error('Error al crear el producto');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getCategories(): Promise<any[]> {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    return await response.json();
  }
}