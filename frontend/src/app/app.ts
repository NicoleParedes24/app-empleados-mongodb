import { Component } from '@angular/core';
import { EmpleadoComponent } from './components/empleado/empleado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmpleadoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
