import { Component } from '@angular/core';
import * as recipeTags from '../core/model/tags';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css'
})
export class TagsListComponent {

  tags = recipeTags.TAGS;
  clicked = false;
  clickedTags: ClickedTag[] = [];

  constructor(private service: RecipesService) { }

  updateValue(name: string) {
    const index = this.clickedTags.findIndex(tag => tag.key === name);
    if (index !== -1) {
      this.clickedTags[index].clicked = !this.clickedTags[index].clicked;
    } else {
      this.clickedTags.push({ key: name, clicked: true });
    }
    this.service.updateSelectedTag(name);
  }

  clickStatus(name:string):boolean|undefined {
    return this.clickedTags.find(tag => tag.key === name)?.clicked;
  }

}

interface ClickedTag {
  key: string;
  clicked: boolean;
}


