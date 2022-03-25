import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : ITask[] = [];
  inprogress : ITask[] = [];
  done : ITask[] = [];
  updateId !: any;
  isEditEnabled : boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
  }

  deleteTask(i: number){
    this.tasks.splice(i,1);
  }

  deleteInProgress(i: number){
    this.inprogress.splice(i,1);
  }

  editTask(item: ITask, i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
  }

  UpdateTask(){
    this.tasks[this.updateId].description = this.todoForm.value.item;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.isEditEnabled = false;
    this.updateId = undefined;
  }

  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
 }
}
