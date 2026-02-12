import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URL_API = 'http://localhost:3000/api/empleados';

  empleados: Empleado[] = [];

  selectedEmpleado: Empleado = {
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0
  };

  constructor(private http: HttpClient) {}

  /* =====================
     GET EMPLEADOS
     ===================== */
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  /* =====================
     CREATE EMPLEADO
     ===================== */
  createEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(this.URL_API, empleado);
  }

  /* =====================
     UPDATE EMPLEADO
     ===================== */
  updateEmpleado(id: string, empleado: Empleado): Observable<any> {
    return this.http.put(`${this.URL_API}/${id}`, empleado);
  }

  /* =====================
     DELETE EMPLEADO
     ===================== */
  deleteEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
