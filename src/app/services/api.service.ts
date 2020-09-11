import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getTodos() {
    return this.httpClient.get('/api/todos');
  }

  getTodo() {

  }

  saveTodo() {

  }

  updateTodo() {

  }

  deleteTodo() {

  }
}
