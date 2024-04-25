import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListComponent } from './tags-list.component';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
