import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() onOpenModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openTodoModal() {
    this.onOpenModal.emit();
  }

}
