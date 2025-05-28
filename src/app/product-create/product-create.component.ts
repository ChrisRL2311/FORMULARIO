import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'; // <-- Importa el servicio

@Component({
  selector: 'app-product-create',
  standalone: true, // <-- Marca como standalone
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async ngOnInit() {
    this.categories = await this.productService.getCategories();
  }

  async onSubmit() {
  if (this.productForm.valid) {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.productForm.value,
          images: ["https://example.com"] // Hardcodeado
        }),
      });
      if (!response.ok) throw new Error('Error al crear el producto');
      alert('¡Producto creado con éxito!');
      this.productForm.reset();
    } catch (error) {
      console.error(error);
      alert('Error al crear el producto');
    }
  }
}
}