import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoginVisible = false;

  onLogin(): void {
    this.isLoginVisible = true;
  }

  onCancelled(): void {
    this.isLoginVisible = false;
  }
}
