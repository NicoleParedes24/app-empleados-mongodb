import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/services/empleado';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class EmpleadoComponent implements OnInit {

  cargando = false;
  editIndex: number | null = null;

  constructor(public empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  /* =====================
     CARGAR EMPLEADOS
     ===================== */
  cargarEmpleados() {
    this.cargando = true;

    this.empleadoService.getEmpleados().subscribe({
      next: (res: Empleado[]) => {
        this.empleadoService.empleados = res;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  /* =====================
     CREAR EMPLEADO
     ===================== */
  addEmpleado(form: any) {
    this.empleadoService.createEmpleado(form.value).subscribe({
      next: (nuevo: Empleado) => {
        this.empleadoService.empleados.push(nuevo);
        form.reset();
      },
      error: (err: any) => console.error(err)
    });
  }

  /* =====================
     VER EMPLEADO
     ===================== */
  verEmpleado(index: number) {
    const emp = this.empleadoService.empleados[index];
    alert(
      `Nombre: ${emp.nombre}\n` +
      `Cargo: ${emp.cargo}\n` +
      `Departamento: ${emp.departamento}\n` +
      `Sueldo: ${emp.sueldo}`
    );
  }

  /* =====================
     EDITAR EMPLEADO
     ===================== */
  editEmpleado(emp: Empleado, index: number) {
    this.editIndex = index;
    this.empleadoService.selectedEmpleado = { ...emp };
  }

  /* =====================
     ACTUALIZAR EMPLEADO
     ===================== */
  updateEmpleado(form: any) {
    if (this.editIndex === null) return;

    const emp = this.empleadoService.empleados[this.editIndex];
    if (!emp._id) return;

    this.empleadoService.updateEmpleado(emp._id, form.value).subscribe({
      next: (actualizado: Empleado) => {
        this.empleadoService.empleados[this.editIndex!] = actualizado;
        this.cancelarEdicion(form);
      },
      error: (err: any) => console.error(err)
    });
  }

  /* =====================
     CANCELAR EDICIÓN
     ===================== */
  cancelarEdicion(form: any) {
    this.editIndex = null;

    this.empleadoService.selectedEmpleado = {
      nombre: '',
      cargo: '',
      departamento: '',
      sueldo: 0
    };

    form.reset();
  }

  /* =====================
     ELIMINAR EMPLEADO (INSTANTÁNEO)
     ===================== */
  deleteEmpleado(index: number) {
    const emp = this.empleadoService.empleados[index];
    if (!emp._id) return;

    if (!confirm('¿Seguro que deseas eliminar este empleado?')) return;

    // UI instantánea
    this.empleadoService.empleados.splice(index, 1);

    this.empleadoService.deleteEmpleado(emp._id).subscribe({
      error: (err: any) => {
        console.error(err);
        this.empleadoService.empleados.splice(index, 0, emp);
        alert('No se pudo eliminar el empleado');
      }
    });
  }
}
