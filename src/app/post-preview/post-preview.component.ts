import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, Input, input, OnInit} from '@angular/core';
import { marked } from 'marked';
import { routes } from '../app.routes';
import { Router, RouterOutlet } from '@angular/router';
import  clip  from 'text-clipper';
import {FileService} from "../file.service";

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet],
  providers: [FileService],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.css',
})
export class PostPreviewComponent {
  
  @Input() file: string;
  body:any;
  title:any;
  subtitle:any;
  data:any;
  
  constructor(private http:HttpClient,private fileService:FileService,private router:Router) {
    this.file='';
  }
  
  ngOnInit() {
    const parsed = JSON.parse(JSON.stringify(this.file));
    this.fileService.getFile(parsed.name).subscribe(data => {
      this.data = marked(data);
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.data, 'text/html');
      this.title = doc.querySelector('h1')?.innerHTML;
      this.subtitle = doc.querySelector('h2')?.innerHTML;
      doc.querySelector('h1')?.remove();
      doc.querySelector('h2')?.remove();
      const clippedHtml = clip(doc.body.innerHTML, 500, {html: true, maxLines: 10});
      this.body = clippedHtml + '<p style="color:red!important">[...]</p>';
    });
  }
  
  navToPost() {
    const parsed = JSON.parse(JSON.stringify(this.file));
    this.router.navigate(
      ['/post'], 
      { queryParams: { id: parsed.name } }).then(r => {return r});
  }
}
