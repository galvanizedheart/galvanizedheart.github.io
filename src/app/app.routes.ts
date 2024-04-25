import { Routes } from '@angular/router';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { AboutViewComponent } from './about-view/about-view.component';
import {AllPostsViewComponent} from "./all-posts-view/all-posts-view.component";

export const routes: Routes = [
    {path:'', component:LandingViewComponent},
    {path:'about-view', component:AboutViewComponent},
    {path:'#latest', component:LandingViewComponent},
    {path:'all-posts', component:AllPostsViewComponent}
];
