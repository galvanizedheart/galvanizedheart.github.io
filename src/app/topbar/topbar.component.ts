import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  constructor(private router: Router) {}
  nav(path: string) {
    this.router.navigate([path]).then(r => {return r});
  }

  openMenu() {
    const button = document.getElementsByClassName('menu')[0];
    const margin = document.getElementsByClassName('wrap')[0];
    if (button.getAttribute('style') == null || button.getAttribute('style') === 'display:none') {
      margin.setAttribute('style', 'margin:none');
      button.setAttribute('style', 'display:flex');
    }else{
      margin.setAttribute('style', 'margin:revert-layer');
      button.setAttribute('style', 'display:none');
    }
  }
}
