import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ITodo } from 'src/app/models/ITodo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  todos: ITodo[] = [];
  todoId: string;

  title: string = "";
  description: string = "";
  checked: boolean = false;

  modalRef: any;

  constructor(private apiService: ApiService,
    private modalService: NgbModal) { }


  ngOnInit() {
    this.apiService.getTodos().subscribe((data: ITodo[]) => {
      this.todos = [...data];
      console.log(data);
    }, error => {
      console.error(error);
    });
  }

  openModal(ref, id?: string, isEdit?: boolean) {
    this.todoId = id;
    if (isEdit) {
      this.getTodoById(id, ref);
      return;
    }

    this.modalRef = this.modalService.open(ref, { centered: true });
  }


  saveTodo() {
    const todo: ITodo = {
      id: uuidv4(),
      title: this.title,
      description: this.description,
      completed: false,
    }
    this.todos.push(todo);

    // clearing modal inputs
    this.title = "";
    this.description = "";

    // saving todo to storage via fake backend
    this.apiService.saveTodo(todo).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });

    this.modalRef.close();
    console.log(this.todos);
  }


  updateTodo() {
    let todo = this.todos.find((todo: ITodo) =>
      todo.id == this.todoId
    );
    todo.title = this.title;
    todo.description = this.description;
    todo.completed = this.checked;

    // update in localStorage via fake backend
    this.apiService.updateTodo(todo).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });

    this.title = "";
    this.description = "";
    this.checked = false;

    this.modalRef.close();
  }


  delTodo() {
    const todoIndex = this.todos.findIndex((todo: ITodo) => todo.id == this.todoId);
    this.todos.splice(todoIndex, 1);

    // clearing from localStorage via fake api service
    this.apiService.deleteTodo(this.todoId).subscribe((data: ITodo) => {
      console.log(data);
    }, error => {
      console.error(error);
    });

    this.modalRef.close();
  }


  getTodoById(id, ref) {
    this.apiService.getTodo(id).subscribe((todo: ITodo) => {
      this.title = todo.title;
      this.description = todo.description;
      this.checked = todo.completed;

      this.modalRef = this.modalService.open(ref, { centered: true });
    }, error => {
      console.error(error);
    });
  }

}
