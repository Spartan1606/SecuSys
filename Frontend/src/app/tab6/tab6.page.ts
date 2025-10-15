import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import { SubjectsService, Subject } from '../services/subjects';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    CommonModule,
    FormsModule
  ]
})
export class Tab6Page implements OnInit {

  subjects: Subject[] = [];
  newSubject: Partial<Subject> = { name: '', description: '' };

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectsService.getSubjects().subscribe({
      next: (data) => {
        console.log('[Admin] Subjects loaded:', data);
        this.subjects = data;
      },
      error: (err) => {
        console.error('[Admin] Error loading subjects:', err);
      }
    });
  }

  addSubject() {
    if (!this.newSubject.name?.trim()) {
      alert('El nombre de la materia es obligatorio.');
      return;
    }

    this.subjectsService.addSubject(this.newSubject).subscribe({
      next: (response) => {
        console.log('[Admin] Subject added:', response);
        this.newSubject = { name: '', description: '' };
        this.loadSubjects();
      },
      error: (err) => {
        console.error('[Admin] Error adding subject:', err);
      }
    });
  }

  deleteSubject(subjectId?: number) {
    if (!subjectId) return;
    if (!confirm('¿Seguro que deseas eliminar esta materia?')) return;

    this.subjectsService.deleteSubject(subjectId).subscribe({
      next: () => {
        console.log('[Admin] Subject deleted:', subjectId);
        this.loadSubjects();
      },
      error: (err) => {
        console.error('[Admin] Error deleting subject:', err);
      }
    });
  }
}
