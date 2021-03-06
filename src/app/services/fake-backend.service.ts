import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ITodo } from '../models/ITodo';

// array in local storage for todos
let todos: ITodo[] = JSON.parse(localStorage.getItem('todos')) || [];

@Injectable()
export class FakeBackendService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/todos') && method === 'GET':
          return getTodos();
        case url.includes('/api/todo') && method === 'GET':
          return getTodo();
        case url.endsWith('/api/todos') && method === 'POST':
          return addTodo();
        case url.endsWith('/api/todos') && method === 'PUT':
          return updateTodo();
        case url.endsWith('/api/todos') && method === 'DELETE':
          return deleteTodo();
        default:
          return next.handle(request);
      }
    }

    // route functions
    function getTodos() {
      return ok(
        todos
      );
    }

    function getTodo() {
      let id = request.params.get('id');
      let todo = todos.find((todo: ITodo) =>
        todo.id == id
      );

      return ok(
        todo
      );
    }

    function addTodo() {
      const todo = body;
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));

      return ok(
        todo
      );
    }

    function updateTodo() {
      const id = body.id;
      let todo = todos.find((todo: ITodo) =>
        todo.id == id
      );

      // updating todo from body payload
      todo.title = body.title;
      todo.description = body.description;
      todo.completed = body.completed;

      localStorage.setItem('todos', JSON.stringify(todos));

      return ok(
        todos
      );
    }

    function deleteTodo() {
      let id = request.params.get('id');
      const todoIndex = todos.findIndex((todo: ITodo) => todo.id == id);
      todos.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(todos));

      return ok(
        {
          status: "Success"
        }
      );
    }


    // helper functions
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};