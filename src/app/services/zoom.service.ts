import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  constructor() {}

  zoom = 5;

  zoomChange: BehaviorSubject<number> = new BehaviorSubject<number>(this.zoom);

  setZoom(zoom: number) {
    this.zoomChange.next(zoom);
  }
}
