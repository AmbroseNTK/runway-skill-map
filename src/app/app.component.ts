import { Component } from '@angular/core';
import { ZoomService } from './services/zoom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skillmap';

  constructor(private zoomService: ZoomService) {}

  zoom(event: number) {
    console.log('zoomChange', event);
    this.zoomService.setZoom(event);
  }
}
