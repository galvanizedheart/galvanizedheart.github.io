import {Injectable, NgModule} from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
@NgModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class FileService {

  constructor(private http: HttpClient){}

  getFilesFromFolder(): Observable<string[]> {
    const path =`https://api.github.com/repos/galvablog/galvablog.github.io/contents/assets/docs`;
    return this.http.get<string[]>(path);
  }

  getFile(file:string): Observable<string> {
    const path = `./assets/docs/${file}`;
    return this.http.get(path, {responseType:'text'});
  }
}
