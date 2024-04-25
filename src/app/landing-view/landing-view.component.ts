import { Component } from '@angular/core';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import {routes} from "../app.routes";
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FileService} from "../file.service";

@Component({
  selector: 'app-landing-view',
  standalone: true,
  imports: [PostPreviewComponent, RouterOutlet, NgForOf],
  providers: [FileService],
  templateUrl: './landing-view.component.html',
  styleUrl: './landing-view.component.css'
})

export class LandingViewComponent {
  files:string[];
  constructor(private router: Router, private fileService: FileService) {
    this.files=[];
  }
  goToLatest() {
    document.location ='#latest';
  }

  ngOnInit(): void {
    this.fileService.getFilesFromFolder().subscribe((files) => {
      this.files = files.splice(0, 3);
      console.log(this.files);
    });
  }

}
