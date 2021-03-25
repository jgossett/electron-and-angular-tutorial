import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  images: string[] = [];
  directory: string[] = [];

  constructor(private imageService: ImageService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.imageService.images.subscribe((value) => {
      this.images = value;
      this.cdr.detectChanges();
    });

    this.imageService.directory.subscribe((value) => {
      this.directory = value;
      this.cdr.detectChanges();
    });
  }

  navigateDirectory(path: string): void {
    this.imageService.navigateDirectory(path);
  }
}
