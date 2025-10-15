import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface Subject {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private baseURL = 'http://127.0.0.1:8000/subjects';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseURL, { headers: this.getAuthHeaders() });
  }

  addSubject(subjectData: Partial<Subject>): Observable<Subject> {
    return this.http.post<Subject>(this.baseURL, subjectData, { headers: this.getAuthHeaders() });
  }

  deleteSubject(subjectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${subjectId}`, { headers: this.getAuthHeaders() });
  }
}
