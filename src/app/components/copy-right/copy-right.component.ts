import { Component } from '@angular/core';

@Component({
    selector: 'app-copy-right',
    template: `<footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Created by <a href="http://github.com/blacksonic/">blacksonic</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>`,
    standalone: true
})
export class CopyRightComponent {}
