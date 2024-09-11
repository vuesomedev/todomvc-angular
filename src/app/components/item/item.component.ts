import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TodoInterface } from '../../services/todo.interface';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

const ENTER_KEY = 'Enter';

@Component({
  selector: 'app-item',
  template: `<li [ngClass]="{ completed: todo.completed, editing, }">
    <div class="view">
      <input class="toggle" type="checkbox" [checked]="todo.completed" (change)="handleCompleted()" />
      <label [attr.id]="todo.id" (dblclick)="handleEdit()">{{ todo.name }}</label>
      <button class="destroy" (click)="handleRemove()"></button>
    </div>
    @if(editing) {
      <input class="edit" [(ngModel)]="name" (blur)="handleBlur()" autofocus />
    }
  </li> `,
  standalone: true,
  imports: [NgClass, FormsModule]
})
export class ItemComponent implements OnChanges {
  editing = false;

  name = '';

  @Input()
  public todo: TodoInterface;

  @Output()
  remove = new EventEmitter<string>();

  @Output()
  update = new EventEmitter<TodoInterface>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.todo) {
      this.name = changes.todo.currentValue.name;
    }
  }

  handleRemove() {
    this.remove.emit(this.todo.id);
  }

  handleBlur() {
    this.update.emit({ id: this.todo.id, name: this.name, completed: this.todo.completed });
    this.editing = false;
  }

  handleEdit() {
    this.editing = true;
  }

  handleCompleted() {
    this.update.emit({ id: this.todo.id, name: this.name, completed: !this.todo.completed });
  }
}
