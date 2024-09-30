import { Component } from '@angular/core';
import { TopbarComponent } from './topbar/topbar.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { RouterLink } from '@angular/router';
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,TopbarComponent, LandingViewComponent, PostPreviewComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'concept';
  //TODO: change title
}
