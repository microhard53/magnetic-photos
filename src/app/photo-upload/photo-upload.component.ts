import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FileSizePipe } from '../shared/file-size.pipe';

interface PhotoPreview {
  url: string;
  name: string;
  size: number;
}

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    FileSizePipe
  ]
})
export class PhotoUploadComponent {
  photos: PhotoPreview[] = [];

  constructor(private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              this.photos.push({
                url: e.target.result as string,
                name: file.name,
                size: file.size
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  continueToCart() {
    localStorage.setItem('cartPhotos', JSON.stringify(this.photos));
    this.router.navigate(['/cart']);
  }
}