import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  @Input() todos: ITodo[];
  @Output() onEditModal: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteModal: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.todos);
  }

  openEditModal(id) {
    this.onEditModal.emit(id);

  }

  openDeleteModal(id) {
    this.onDeleteModal.emit(id);
  }
}
