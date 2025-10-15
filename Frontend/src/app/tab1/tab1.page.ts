import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page {
  usuario: string = '';
  contrasena: string = '';
  rol: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) {}

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

    switch (this.rol){

      case 'profesor':
        this.rol = 'teacher'
        break;
      
      case 'estudiante':
        this.rol = 'student'
        break;
      
      default:
        break;
    }

    // Aquí puedes enviar la información al backend con HttpClient
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.contrasena);
    console.log('Rol:', this.rol);

    const userData = {

      name: this.usuario,
      password: this.contrasena,
      role: this.rol

    };

    this.authService.register(userData).subscribe(
      {

        next: async(response) => {

          console.log('Usuario registrado: ', response);

          const toast = await this.toastCtrl.create({

            message: 'Usuario registrado correctamente.',
            duration: 2000,
            color: 'success'

          });

          this.navCtrl.navigateForward('/tabs/tab2');

        },

        error: async (err) => {

          console.error('Error al registrar el usuario: ', err);

          const toast = await this.toastCtrl.create({

            message: 'Error al registrar el usuario', 
            duration: 2000,
            color: 'danger'

          });

        }

      }
    )
  }

  goToLogin() {
    // Aquí puedes navegar al tab del login (por ejemplo tab2)
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
