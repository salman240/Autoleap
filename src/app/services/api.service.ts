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

  getTodo(id) {
    return this.httpClient.get(apiUrls.GET_TODO_URL, {
      params: {
        id
      }
    });
  }

  saveTodo(todo: ITodo) {
    return this.httpClient.post(apiUrls.SAVE_TODO_URL, todo);
  }

  updateTodo(todo: ITodo) {
    return this.httpClient.put(apiUrls.UPDATE_TODO_URL, todo);
  }

  deleteTodo(id) {
    return this.httpClient.delete(apiUrls.DELETE_TODO_URL, {
      params: {
        id
      }
    });
  }
}
