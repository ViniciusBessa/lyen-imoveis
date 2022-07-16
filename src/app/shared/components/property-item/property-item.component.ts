import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css'],
  animations: [
    trigger('property', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
    ]),
  ],
})
export class PropertyItemComponent implements OnInit {
  @Input() property!: Property;

  constructor() {}

  ngOnInit(): void {}
}
