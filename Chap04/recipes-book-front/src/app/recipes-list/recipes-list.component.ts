import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../core/services/recipes.service';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule, FormsModule
  ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class RecipesListComponent {
  recipes$ = this.service.recipes$;

  constructor(private service: RecipesService) { }

}
