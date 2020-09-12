import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../helpers/apiUrls';
import { ITodo } from '../models/ITodo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getTodos() {
    return this.httpClient.get(apiUrls.GET_TODOS_URL);
  }

  getTodo() {

  }

  saveTodo(todo: ITodo) {
    return this.httpClient.post(apiUrls.SAVE_TODO_URL, todo);
  }

  updateTodo() {

  }

  deleteTodo() {

  }
}
