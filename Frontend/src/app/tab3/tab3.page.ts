import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab3Page {
  nombre = 'Juan Pérez';
  codigo = 'STU-001';
  correo = 'juan.perez@colegio.com';
  promedioGeneral = 4.2;

  notas = [
    { materia: 'Matemáticas', valor: 4.5, fecha: '2025-10-01' },
    { materia: 'Ciencias Naturales', valor: 3.8, fecha: '2025-10-03' },
    { materia: 'Lengua Castellana', valor: 2.9, fecha: '2025-10-04' },
    { materia: 'Educación Física', valor: 4.7, fecha: '2025-10-05' }
  ];

  constructor() {}
}
