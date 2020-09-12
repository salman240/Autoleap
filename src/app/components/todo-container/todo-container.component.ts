import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  @Input() todos: ITodo[];

  constructor() { }

  ngOnInit() {
    console.log(this.todos);
  }

}
