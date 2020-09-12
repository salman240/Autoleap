import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ITodo } from 'src/app/models/ITodo';
import { ApiService } from 'src/app/services/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() addTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  title: string = "";
  description: string = "";
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal,
    private apiService: ApiService) { }

  ngOnInit() {
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

    // saving todo to storage via fake backend
    this.apiService.saveTodo(todo).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });

    this.addTodo.emit(todo);
  }

}
