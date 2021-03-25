import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const windowAny: any = window;
const electron = windowAny.require != null ? windowAny.require('electron') : undefined;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images = new BehaviorSubject<string[]>([]);
  directory = new BehaviorSubject<string[]>([]);

  constructor() {
    electron?.ipcRenderer?.on('getImagesResponse', (event: any, images: any) => {
      this.images.next(images);
    });
    electron?.ipcRenderer?.on('getDirectoryResponse', (event: any, directory: any) => {
      this.directory.next(directory);
    });
  }

  navigateDirectory(path: string): void {
    electron?.ipcRenderer?.send('navigateDirectory', path);
  }
}
