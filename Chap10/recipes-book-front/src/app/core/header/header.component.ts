import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SharedDataService } from '../services/shared-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private sharedService: SharedDataService) { } 
  selectedRecipe$ = this.sharedService.selectedRecipe$; 
}
