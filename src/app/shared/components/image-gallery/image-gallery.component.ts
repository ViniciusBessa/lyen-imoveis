import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {
  @Input() images: Property['images'] = [];
  selectedImageIndex!: number;

  constructor() {}

  ngOnInit(): void {
    this.selectedImageIndex = 0;
  }

  onSelectImage(index: number): void {
    this.selectedImageIndex = index;
  }
}
