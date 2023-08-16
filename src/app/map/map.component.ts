import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { debounceTime, fromEvent, take, throttle, throttleTime } from 'rxjs';
import { ZoomService } from '../services/zoom.service';
import { DrawerService } from '../side-drawer/drawer.service';
import { Store } from '@ngrx/store';
import { SkillState } from 'src/redux/states/skill.state';
import { get } from '../../redux/actions/skill.action';
import { ProfileState } from 'src/redux/states/profile.state';
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
  accelaration = 0.5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zoomService: ZoomService,
    private drawer: DrawerService,
    private store: Store<{ skill: SkillState; profile: ProfileState }>
  ) {
    activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      let x1 = params.x1;
      let y1 = params.y1;
      let x2 = params.x2;
      let y2 = params.y2;
      let zoom = params.zoom;
      if (x1 && y1 && x2 && y2) {
      } else {
        // check in local storage
        x1 = parseFloat(window.localStorage.getItem('x1') ?? '0');
        y1 = parseFloat(window.localStorage.getItem('y1') ?? '0');
        x2 = parseFloat(
          window.localStorage.getItem('x2') ?? window.innerWidth.toString()
        );
        y2 = parseFloat(
          window.localStorage.getItem('y2') ?? window.innerHeight.toString()
        );
        if (x1 && y1 && x2 && y2) {
          this.viewBox = [x1, y1, x2, y2];
        }
      }
      if (zoom) {
        this.zoomService.setZoom(zoom);
      } else {
        // check in local storage
        zoom = parseInt(window.localStorage.getItem('zoom') ?? '5');
        if (zoom) {
          this.zoomService.setZoom(zoom);
        }
      }

      let id = params.id;
      if (id) {
        this.store.dispatch(get(id));
        this.drawer.openStateChange.next(true);
        this.drawer.enableInfo(true);
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
    // save to local storage
    window.localStorage.setItem('x1', x1.toString());
    window.localStorage.setItem('y1', y1.toString());
    window.localStorage.setItem('x2', x2.toString());
    window.localStorage.setItem('y2', y2.toString());
    window.localStorage.setItem('zoom', this.zoom.toString());
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
    event.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    let deltaX = event.movementX * this.accelaration * (11 - this.zoom);
    let deltaY = event.movementY * this.accelaration * (11 - this.zoom);
    // delta x and delta y
    this.viewBox[0] -= deltaX;
    this.viewBox[1] -= deltaY;
    this.viewBox[2] = -deltaX + this.width;
    this.viewBox[3] = -deltaY + this.height;
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
    console.log('touchmove');
    // event.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    // delta x and delta y
    let deltaX = event.touches[0].clientX - this.lastTouchX;
    let deltaY = event.touches[0].clientY - this.lastTouchY;
    deltaX = deltaX * this.accelaration * (11 - this.zoom);
    deltaY = deltaY * this.accelaration * (11 - this.zoom);
    this.lastTouchX = event.touches[0].clientX;
    this.lastTouchY = event.touches[0].clientY;
    this.viewBox[0] -= deltaX;
    this.viewBox[1] -= deltaY;
    this.viewBox[2] = -deltaX + this.width;
    this.viewBox[3] = -deltaY + this.height;
  }

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    event.preventDefault();
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
