// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create/product-create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCreateComponent], // <-- Componente standalone
  template: `
    <div class="container">
      <app-product-create></app-product-create>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
  `]
})
export class AppComponent {}