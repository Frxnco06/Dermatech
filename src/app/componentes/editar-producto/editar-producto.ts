import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoDTO } from '../../services/producto';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.html',
  styleUrls: ['./editar-producto.css']
})
export class EditarProductoComponent {
  @Input() producto: ProductoDTO | null = null;
  @Input() productosExistentes: ProductoDTO[] = [];
  @Output() guardar = new EventEmitter<ProductoDTO>();
  @Output() cancelar = new EventEmitter<void>();

  // VALIDACIÓN DE SKU (Corregida para permitir edición)
  get skuDuplicado(): boolean {
    if (!this.producto || !this.producto.sku) return false;
    
    return this.productosExistentes.some(p => 
      p.sku.toLowerCase() === this.producto!.sku.toLowerCase() && 
      p.idProducto !== this.producto!.idProducto // <--- Esto permite editar sin error
    );
  }

  // VALIDACIÓN DE NOMBRE (Corregida para permitir edición)
  get nombreDuplicado(): boolean {
    if (!this.producto || !this.producto.nombreProducto) return false;

    return this.productosExistentes.some(p => 
      p.nombreProducto.toLowerCase() === this.producto!.nombreProducto.toLowerCase() && 
      p.idProducto !== this.producto!.idProducto // <--- Esto permite editar sin error
    );
  }

  guardarCambios(): void {
    // Si hay duplicados de OTROS productos, no hace nada
    if (this.skuDuplicado || this.nombreDuplicado) return;
    
    if (this.producto) {
      this.guardar.emit(this.producto);
    }
  }

  cerrar(): void {
    this.cancelar.emit();
  }
}