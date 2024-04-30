import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, Input, input, OnInit} from '@angular/core';
import { marked } from 'marked';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import {FileService} from "../file.service";
import {PostPreviewComponent} from "../post-preview/post-preview.component";

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    PostPreviewComponent, HttpClientModule
  ],
  providers: [FileService],
  templateUrl: '../post-preview/post-preview.component.html',
  styleUrls: ['../post-preview/post-preview.component.css', './post-view.component.css']
})
export class PostViewComponent {
  
  fileName:any;
  body:any;
  title:any;
  subtitle:any;
  data:any;
  constructor(private http:HttpClient,private fileService:FileService,private route:ActivatedRoute) {
    this.fileName='';
  }

  navToPost(){}

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.fileName = params.get('id');
      });
    const parsed = JSON.parse(JSON.stringify(this.fileName));
    console.log(parsed);
    this.fileService.getFile(parsed).subscribe(data => {
      this.data = marked(data);
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.data, 'text/html');
      this.title = doc.querySelector('h1')?.innerHTML;
      this.subtitle = doc.querySelector('h2')?.innerHTML;
      doc.querySelector('h1')?.remove();
      doc.querySelector('h2')?.remove();
      this.body = doc.body.innerHTML;
    });
  }
}
