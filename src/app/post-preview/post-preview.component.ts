import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import { marked } from 'marked';
import  clip  from 'text-clipper';
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../file.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  providers: [FileService],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.css',
})
export class PostPreviewComponent {
  @Input() file: string;
  body:any;
  title:any;
  subtitle:any;
  location : any;
  whoAmI:any;
  data:any;
  constructor(private route:ActivatedRoute, private http:HttpClient,private fileService:FileService, private router:Router) {
    this.file='';
  }

  ngOnInit() {
    let firstTry = JSON.parse(JSON.stringify(this.file));
    let secondTry: string | null = null;
    let name = firstTry.name;
    this.route.queryParamMap
      .subscribe(params => {
        params.get('slugId') != undefined ?  secondTry= params.get('slugId') : null;
        secondTry != null ? name = secondTry : null;
      });

    this.fileService.getFile(name).subscribe(data => {
      this.data = marked(data);
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.data, 'text/html');
      this.title = doc.querySelector('h1')?.innerHTML;
      this.subtitle = doc.querySelector('h2')?.innerHTML;
      doc.querySelector('h1')?.remove();
      doc.querySelector('h2')?.remove();
      if (secondTry!=null){
        this.body = doc.body.innerHTML;
        document.getElementById('ovrly')!.style.display = 'none';
      }else{
        const clippedHtml = clip(doc.body.innerHTML, 500, {html: true, maxLines: 10});
        this.body = clippedHtml + '<p style="color:red!important">[...]</p>';
      }
      let datetime = name.split('_');
      datetime[1] = datetime[1].slice(0,datetime[1].length - 3).replace('-', ':');
      document.getElementById('tmstmp')!.innerHTML = datetime[0] + '@'+datetime[1];
      this.location = name;
    });
  }

  goToArticle (){
    this.router.navigate(['/post/'],
      {queryParams: {slugId: this.location}}).then(r => {return r;});
  }
}
