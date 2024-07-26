import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  studentObj: studentModal = new studentModal();
  studentList: studentModal[] = [];

  ngOnInit(): void {
    this.getStudentList();
  }

  openModal() {
    const stdModal = document.getElementById('myModal');

    if (stdModal != null) {
      stdModal.style.display = 'block';
    }
  }

  closeModal() {
    this.studentObj = new studentModal();
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  onSaveForm() {
    // debugger;
    const localData = localStorage.getItem('studentData');

    if (localData != null) {
      const stdData = JSON.parse(localData);
      stdData.push(this.studentObj);
      this.studentObj.id = stdData.length + 1;
      localStorage.setItem('studentData', JSON.stringify(stdData));
    } else {
      const newStudent = [];
      newStudent.push(this.studentObj);
      this.studentObj.id = 1;
      localStorage.setItem('studentData', JSON.stringify(newStudent));
    }

    this.closeModal();
    this.getStudentList();
  }

  onUpdateForm() {
    const currentStudent = this.studentList.find(
      (s) => s.id === this.studentObj.id
    );

    if (currentStudent != undefined) {
      currentStudent.name = this.studentObj.name;
      currentStudent.mobile = this.studentObj.mobile;
      currentStudent.email = this.studentObj.email;
      currentStudent.gender = this.studentObj.gender;
      currentStudent.doj = this.studentObj.doj;
      currentStudent.address = this.studentObj.address;
      currentStudent.status = this.studentObj.status;
    }
    localStorage.setItem('studentData', JSON.stringify(this.studentList));
    this.closeModal();
    this.getStudentList();
  }

  onEditStudent(studentData: studentModal) {
    this.studentObj = studentData;
    this.openModal();
  }

  onDeleteStudent(studentData: studentModal) {
    this.studentObj = studentData;
    const isConfirm = confirm('Are you sure you want to delete the record?');

    if (isConfirm) {
      const currentStudent = this.studentList.findIndex(
        (s) => s.id === this.studentObj.id
      );
      this.studentList.splice(currentStudent, 1);
      localStorage.setItem('studentData', JSON.stringify(this.studentList));
    }
  }

  getStudentList() {
    const localData = localStorage.getItem('studentData');

    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }
}

export class studentModal {
  id: number;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  doj: string;
  address: string;
  status: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobile = '';
    this.email = '';
    this.gender = '';
    this.doj = '';
    this.address = '';
    this.status = false;
  }
}
