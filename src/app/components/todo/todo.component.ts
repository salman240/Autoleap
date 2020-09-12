import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: ITodo;
  @Output() onEditModal: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteModal: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.todo);
  }

  openEditModal(id) {
    this.onEditModal.emit(id);

  }

  openDeleteModal(id) {
    this.onDeleteModal.emit(id);
  }

}
