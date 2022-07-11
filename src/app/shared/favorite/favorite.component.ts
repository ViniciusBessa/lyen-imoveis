import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  @Input() isFavorited: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onAddToFavorites(): void {
    this.isFavorited = true;
  }

  onRemoveFromFavorites(): void {
    this.isFavorited = false;
  }
}
