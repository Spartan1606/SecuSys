import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  usuario: string = '';
  contrasena: string = '';
  rol: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  async registrarUsuario() {
    if (!this.usuario || !this.contrasena || !this.rol) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    switch (this.rol) {
      case 'profesor':
        this.rol = 'teacher';
        break;
      case 'estudiante':
        this.rol = 'student';
        break;
      default:
        break;
    }

    const userData = {
      name: this.usuario,
      password: this.contrasena,
      role: this.rol
    };

    this.authService.register(userData).subscribe({
      next: async (response) => {
        console.log('Usuario registrado:', response);

        const toast = await this.toastCtrl.create({
          message: 'Usuario registrado correctamente.',
          duration: 2000,
          color: 'success'
        });

        await toast.present();
        this.navCtrl.navigateForward('/tabs/tab2');
      },

      error: async (err) => {
        console.error('Error al registrar usuario:', err);

        const toast = await this.toastCtrl.create({
          message: 'Error al registrar usuario',
          duration: 2000,
          color: 'danger'
        });

        await toast.present();
      }
    });
  }

  goToLogin() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
