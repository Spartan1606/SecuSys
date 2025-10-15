import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab5Page {
  estudiantes = ['Juan Pérez', 'Ana Torres', 'Luis Díaz', 'Laura Mejía'];
  materias = ['Matemáticas', 'Ciencias Naturales', 'Lengua Castellana'];

  estudianteSeleccionado: string = '';
  materiaSeleccionada: string = '';
  nota: number | null = null;

  constructor(private toastCtrl: ToastController) {}

  async guardarNota() {
    if (!this.estudianteSeleccionado || !this.materiaSeleccionada || this.nota === null) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    console.log('✅ Nota registrada:');
    console.log('Estudiante:', this.estudianteSeleccionado);
    console.log('Materia:', this.materiaSeleccionada);
    console.log('Nota:', this.nota);

    const toast = await this.toastCtrl.create({
      message: `Nota de ${this.nota} guardada para ${this.estudianteSeleccionado} en ${this.materiaSeleccionada}.`,
      duration: 2500,
      color: 'success'
    });
    await toast.present();

    // Reinicia el formulario
    this.estudianteSeleccionado = '';
    this.materiaSeleccionada = '';
    this.nota = null;
  }
}
