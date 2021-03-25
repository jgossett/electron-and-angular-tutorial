import {Component, OnInit} from '@angular/core';
import {ImageService} from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ImageBrowser';

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.navigateDirectory('.');
  }
}
