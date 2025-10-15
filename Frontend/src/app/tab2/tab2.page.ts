import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page {
  usuario: string = '';
  contrasena: string = '';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) { }

  async iniciarSesion() {
    if (!this.usuario || !this.contrasena) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, ingrese usuario y contraseña.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    this.authService.login({ username: this.usuario, password: this.contrasena }).subscribe({
      next: async (response) => {
        const role = this.authService.getUserRole();
        console.log('[Login] Role detected:', role);

        const toast = await this.toastCtrl.create({
          message: 'Inicio de sesión exitoso',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        if (role === 'student') {
          this.navCtrl.navigateForward('/tabs/tab3');
        } else if (role === 'teacher') {
          this.navCtrl.navigateForward('/tabs/tab4');
        } else if (role === 'admin') {
          this.navCtrl.navigateForward('/tabs/tab5'); 
        } else {
          this.navCtrl.navigateForward('/tabs/tab2');
        }
      },
      error: async (error) => {
        console.error('Error al iniciar sesión: ', error);
        const toast = await this.toastCtrl.create({
          message: 'Usuario o contraseña incorrectos',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });

  }

  goToRegister() {
    this.navCtrl.navigateForward('/tabs/tab1');
  }
}
