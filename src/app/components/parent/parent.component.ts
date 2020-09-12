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
  title: string = "";
  description: string = "";
  modalRef: NgbModalRef;

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

  openModal(ref: NgbModalRef) {
    this.modalRef = this.modalService.open(ref, { centered: true });
  }


  saveTodo() {
    this.modalRef.close();

    const todo: ITodo = {
      id: uuidv4(),
      title: this.title,
      description: this.description,
      completed: false,
    }
    this.todos.push(todo);
    this.title = "";
    this.description = "";

    // saving todo to storage via fake backend
    this.apiService.saveTodo(todo).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });

    console.log(this.todos);
    console.log(event);
    console.log(this.todos);
  }
}
