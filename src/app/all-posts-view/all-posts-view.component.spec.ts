import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostsViewComponent } from './all-posts-view.component';

describe('AllPostsViewComponent', () => {
  let component: AllPostsViewComponent;
  let fixture: ComponentFixture<AllPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPostsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
