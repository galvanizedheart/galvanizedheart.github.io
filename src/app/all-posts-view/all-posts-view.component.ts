import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {PostPreviewComponent} from "../post-preview/post-preview.component";
import {FileService} from "../file.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-all-posts-view',
  standalone: true,
    imports: [
        NgForOf,
        PostPreviewComponent
    ],
  providers: [FileService],
  templateUrl: './all-posts-view.component.html',
  styleUrl: './all-posts-view.component.css'
})
export class AllPostsViewComponent {
  files:string[];
  constructor(private fileService:FileService) {
    this.files = [];
  }

  ngOnInit(): void {
    this.fileService.getFilesFromFolder().subscribe((files) => {
      this.files = files.splice(0, 5);
    });
  }

}
