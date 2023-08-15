import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { debounceTime, fromEvent, take, throttle, throttleTime } from 'rxjs';
import { ZoomService } from '../services/zoom.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  width = 2000;
  height = 2000;

  viewBox = [0, 0, this.width, this.height];

  zoom = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zoomService: ZoomService
  ) {
    activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      let x1 = params.x1;
      let y1 = params.y1;
      let x2 = params.x2;
      let y2 = params.y2;
      let zoom = params.zoom;
      if (x1 && y1 && x2 && y2) {
        this.viewBox = [x1, y1, x2, y2];
      }
      if (zoom) {
        this.zoomService.setZoom(zoom);
      }
    });

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.zoomService.zoomChange.subscribe((zoom) => {
      this.zoom = zoom;
      this.width = (window.innerWidth / zoom) * 10;
      this.height = (window.innerHeight / zoom) * 10;
      this.viewBox[2] = this.width;
      this.viewBox[3] = this.height;
    });
  }

  updateParams() {
    let x1 = this.viewBox[0];
    let y1 = this.viewBox[1];
    let x2 = this.viewBox[2];
    let y2 = this.viewBox[3];
    this.router.navigate([], {
      queryParams: { x1, y1, x2, y2, zoom: this.zoom },
    });
  }

  isMouseDown = false;

  // listen on mouse down
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    console.log('mousedown');
    this.isMouseDown = true;
  }

  // listen on mouse up
  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.updateParams();
  }

  // listen on mouse leave
  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent) {
    this.isMouseDown = false;
  }

  // listen on mouse move
  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }
    // delta x and delta y
    this.viewBox[0] -= event.movementX;
    this.viewBox[1] -= event.movementY;
    this.viewBox[2] = -event.movementX + this.width;
    this.viewBox[3] = -event.movementY + this.height;
  }

  // listen on touch start
  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    console.log('touchstart');
    this.lastTouchX = event.touches[0].clientX;
    this.lastTouchY = event.touches[0].clientY;
    this.isMouseDown = true;
  }

  // listen on touch end
  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    this.isMouseDown = false;
    this.updateParams();
  }

  lastTouchX = 0;
  lastTouchY = 0;
  // listen on touch move
  @HostListener('touchmove', ['$event'])
  public onTouchMove(event: TouchEvent) {
    if (!this.isMouseDown) {
      return;
    }
    // delta x and delta y
    let deltaX = event.touches[0].clientX - this.lastTouchX;
    let deltaY = event.touches[0].clientY - this.lastTouchY;
    this.lastTouchX = event.touches[0].clientX;
    this.lastTouchY = event.touches[0].clientY;
    this.viewBox[0] -= deltaX;
    this.viewBox[1] -= deltaY;
    this.viewBox[2] = -deltaX + this.width;
    this.viewBox[3] = -deltaY + this.height;
  }

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    this.viewBox[0] += event.deltaX;
    this.viewBox[1] += event.deltaY;
    this.viewBox[2] = event.deltaX + this.width;
    this.viewBox[3] = event.deltaY + this.height;

    if (this.viewBox[0] < 0) {
      this.viewBox[0] = 0;
      this.viewBox[2] = this.width;
    }

    if (this.viewBox[1] < 0) {
      this.viewBox[1] = 0;
      this.viewBox[3] = this.height;
    }

    console.log(this.viewBox);
  }

  selectSkill(id: string) {
    alert(`You selected skill ${id}`);
  }

  getViewBoxProp() {
    return this.viewBox.join(' ');
  }
}
