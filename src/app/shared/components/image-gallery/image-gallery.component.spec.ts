import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryComponent } from './image-gallery.component';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display one selected image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selectedImages = compiled.querySelectorAll(
      '.image-gallery__selected'
    );
    expect(selectedImages.length).toBe(1);
  });

  it('should display the placeholder image if no images were provided', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Getting the selected image
    const selectedImage = compiled.querySelector(
      '.image-gallery__selected'
    ) as HTMLImageElement;
    expect(selectedImage.src).toContain('assets/images/placeholder_house.jpg');
  });

  it('should display the provided images', () => {
    component.images = ['image1', 'image2', 'image3'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Getting the selected image
    const selectedImage = compiled.querySelector(
      '.image-gallery__selected'
    ) as HTMLImageElement;

    // Getting the div containing all the images
    const imagesDiv = compiled.querySelector(
      '.image-gallery__images'
    ) as HTMLDivElement;

    expect(selectedImage.src).toContain('image1');
    expect(imagesDiv.children.length).toBe(3);
  });

  it('should update the selected image', () => {
    spyOn(component, 'onSelectImage').and.callThrough();
    component.images = ['image1', 'image2', 'image3'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Getting the div containing all the images
    const imagesDiv = compiled.querySelector(
      '.image-gallery__images'
    ) as HTMLDivElement;

    // Selecting the third image
    (<HTMLImageElement>imagesDiv.children.item(2)).click();
    fixture.detectChanges();

    // Getting the new selected image
    const selectedImage = compiled.querySelector(
      '.image-gallery__selected'
    ) as HTMLImageElement;

    expect(component.onSelectImage).toHaveBeenCalled();
    expect(component.selectedImageIndex).toBe(2);
    expect(selectedImage.src).toContain('image3');
  });
});
