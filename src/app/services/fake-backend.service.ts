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
        case url.includes('/api/todo?') && method === 'GET':
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
      return ok(
        todos
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
      return ok(
        todos
      );
    }

    function deleteTodo() {
      return ok(
        todos
      );
    }

    // function register() {
    //   const user = body

    //   if (todos.find(x => x.username === user.username)) {
    //     return error('Username "' + user.username + '" is already taken')
    //   }

    //   user.id = todos.length ? Math.max(...todos.map(x => x.id)) + 1 : 1;
    //   todos.push(user);
    //   localStorage.setItem('users', JSON.stringify(todos));

    //   return ok();
    // }



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