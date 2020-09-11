import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "";
  description: string = "";
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(ref: NgbModalRef) {
    this.modalRef = this.modalService.open(ref, {});
  }

  saveTodo() {
    console.log(this.title);
    console.log(this.description);

    this.modalRef.close();
  }

}
