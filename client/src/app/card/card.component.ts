import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() compound = {
    chemical_name: '',
    chemical_image: '',
    chemical_description: '',
    chemical_image_attribution: '',
  };
  @Input() random ={
    chemical_name: '',
    chemical_image: '',
    chemical_description: '',
    chemical_image_attribution: '',
  }

}
