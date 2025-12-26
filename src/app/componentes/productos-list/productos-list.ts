import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, ProductoDTO } from '../../services/producto';
import { EditarProductoComponent } from '../editar-producto/editar-producto';
import { UiService } from '../../services/ui-service'; // Asegúrate de crear este servicio
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, EditarProductoComponent],
  templateUrl: './productos-list.html',
  styleUrls: ['./productos-list.css']
})
export class ProductosListComponent implements OnInit, OnDestroy {

  productos: ProductoDTO[] = [];
  productoSeleccionado: ProductoDTO | null = null;
  cargando = true;
  error = '';
  private modalSub: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private uiService: UiService // Inyectamos el servicio de UI
  ) {}

  ngOnInit(): void {
    this.cargarProductos();

    // Escuchamos al Sidebar para abrir el modal de "Nuevo"
    this.modalSub = this.uiService.abrirModal$.subscribe(() => {
      this.nuevoProducto();
    });
  }

  ngOnDestroy(): void {
    this.modalSub.unsubscribe(); // Limpieza de memoria
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productoService.obtenerTodos().subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar productos';
        this.cargando = false;
      }
    });
  }

  editar(p: ProductoDTO): void {
    this.productoSeleccionado = { ...p };
  }

  nuevoProducto(): void {
    this.productoSeleccionado = {
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagenUrl: '',
      sku: '',
      activo: true,
      idCategoria: 1
    };
  }

  // GUARDAR CON ALERTA ELEGANTE
  guardarProducto(p: ProductoDTO): void {
    if (!p.idProducto) {
      this.productoService.crear(p).subscribe({
        next: () => {
          this.notificarExito('¡Producto creado con éxito!');
          this.refrescarYLimpiar();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          this.notificarError('No se pudo crear. Verifica si el SKU ya existe.');
          this.refrescarYLimpiar();
        }
      });
      return;
    }

    this.productoService.actualizar(p.idProducto, p).subscribe({
      next: () => {
        this.notificarExito('¡Producto actualizado correctamente!');
        this.refrescarYLimpiar();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.notificarError('Ocurrió un error al actualizar los datos.');
        this.cancelarEdicion();
      }
    });
  }

  // ELIMINAR CON ALERTA ELEGANTE
  eliminarProducto(p: ProductoDTO): void {
    if (!p.idProducto) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar "${p.nombreProducto}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminar(p.idProducto!).subscribe({
          next: () => {
            this.notificarExito('Eliminado correctamente');
            this.cargarProductos();
          },
          error: () => this.notificarError('Error al eliminar producto')
        });
      }
    });
  }

  // MÉTODOS AUXILIARES PARA ALERTAS
  private notificarExito(msg: string) {
    Swal.fire({
      icon: 'success',
      title: msg,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }

  private notificarError(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: msg,
      confirmButtonColor: '#3085d6'
    });
  }

  private refrescarYLimpiar() {
    this.cargarProductos();
    this.cancelarEdicion();
  }

  cancelarEdicion(): void {
    this.productoSeleccionado = null;
  }

  trackById(index: number, p: ProductoDTO) {
    return p.idProducto;
  }
}