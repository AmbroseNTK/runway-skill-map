import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  map,
  take,
  throttle,
  throttleTime,
} from 'rxjs';
import { ZoomService } from '../services/zoom.service';
import { DrawerService } from '../side-drawer/drawer.service';
import { Store } from '@ngrx/store';
import { SkillState } from 'src/redux/states/skill.state';
import { get } from '../../redux/actions/skill.action';
import { ProfileState } from 'src/redux/states/profile.state';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  baseWidth = 3535;
  baseHeight = 1555;

  zoom = 5;
  viewBox = [0, 0, this.baseWidth, this.baseHeight];
  accelaration = 0.5;

  readonly coordinates$ = new BehaviorSubject([0, 0]);

  readonly transform$ = this.coordinates$.pipe(
    map((coords) =>
      this.sanitizer.bypassSecurityTrustStyle(
        `translate3d(${coords[0]}px, ${coords[1]}px,0)`
      )
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zoomService: ZoomService,
    private drawer: DrawerService,
    private store: Store<{ skill: SkillState; profile: ProfileState }>,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer
  ) {
    activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      let x = params.x;
      let y = params.y;
      let zoom = params.zoom;

      if (x && y) {
        this.coordinates$.next([parseFloat(x), parseFloat(y)]);
      } else {
        // load from local storage
        let x = window.localStorage.getItem('x');
        let y = window.localStorage.getItem('y');
        if (x && y) {
          this.coordinates$.next([parseFloat(x), parseFloat(y)]);
        }
      }
      if (zoom) {
        this.zoomService.setZoom(parseInt(zoom));
      } else {
        // load from local storage
        let zoom = window.localStorage.getItem('zoom');
        if (zoom) {
          this.zoomService.setZoom(parseInt(zoom));
        }
      }

      let id = params.id;
      if (id) {
        this.store.dispatch(get(id));
        this.drawer.openStateChange.next(true);
        this.drawer.enableInfo(true);
      }
    });

    this.zoomService.zoomChange.subscribe((zoom) => {
      this.zoom = zoom;
      console.log('zoomChange', zoom);
      let width = this.baseWidth / zoom;
      let heigth = this.baseHeight / zoom;
      this.viewBox[2] = width;
      this.viewBox[3] = heigth;
    });
  }

  updateParams() {
    window.localStorage.setItem('x', this.currentCoords[0].toString());
    window.localStorage.setItem('y', this.currentCoords[1].toString());
    window.localStorage.setItem('zoom', this.zoom.toString());
    this.router.navigate([], {
      queryParams: {
        x: this.currentCoords[0],
        y: this.currentCoords[1],
        zoom: this.zoom,
      },
    });
  }

  isMouseDown = false;

  // listen on mouse down
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    console.log('mousedown');
    // this.isMouseDown = true;
  }

  // listen on mouse up
  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    // this.isMouseDown = false;
    console.log(this.currentCoords.join(', '));
    this.updateParams();
    this.updateParams();
  }

  // listen on touch end
  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    // this.isMouseDown = false;

    this.updateParams();
  }

  selectSkill(id: string) {
    alert(`You selected skill ${id}`);
  }

  getViewBoxProp() {
    return this.viewBox.join(' ');
  }

  // onPan(delta: readonly [number, number]): void {
  //   this.coordinates$.next([delta[0], delta[1]]);
  // }
  onPan(delta: readonly [number, number]): void {
    this.coordinates$.next([
      this.currentCoords[0] + delta[0],
      this.currentCoords[1] + delta[1],
    ]);
  }
  get currentCoords(): number[] {
    return this.coordinates$.value;
  }

  getSize() {
    return `${(this.zoom * 100) / 5}%`;
  }
}
