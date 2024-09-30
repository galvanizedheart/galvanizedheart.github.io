import { Component } from '@angular/core';
import {PostPreviewComponent} from "../post-preview/post-preview.component";

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    PostPreviewComponent
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent {
  ngOnInit() {
    document.location = document.location+'#container';
  }
}
