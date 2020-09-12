import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  todos: ITodo[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTodos().subscribe((data: ITodo[]) => {
      this.todos = [...data];
      console.log(data);
    }, error => {
      console.error(error);
    });
  }

  addTodo(event) {
    console.log(this.todos);
    this.todos.push(event);
    console.log(event);
    console.log(this.todos);
  }
}
