import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoInterface } from '../../services/todo.interface';
import { ItemComponent } from '../item/item.component';
import { AsyncPipe } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  template: `<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" readonly [checked]="allCompleted$ | async" />
    <label htmlFor="toggle-all" (click)="handleCompleteAll()"></label>

    <ul class="todo-list">
      @for (todo of (visibleTodos$ | async); track $index) {
      <app-item [todo]="todo" (remove)="handleRemove($event)" (update)="handleUpdate($event)"></app-item>
      }
    </ul>
  </section> `,
  standalone: true,
  imports: [ItemComponent, AsyncPipe]
})
export class ListComponent {
  visibleTodos$: Observable<ReadonlyArray<TodoInterface>>;

  allCompleted$: Observable<boolean>;

  constructor(private todoService: TodoService) {
    this.visibleTodos$ = todoService.getTodos();
    this.allCompleted$ = todoService.completedTodos();
  }

  public handleRemove(id: string) {
    this.todoService.deleteTodo(id);
  }

  public handleUpdate(values: TodoInterface) {
    this.todoService.updateTodo(values);
  }

  public handleCompleteAll() {
    this.todoService.toggleCompleted();
  }
}
