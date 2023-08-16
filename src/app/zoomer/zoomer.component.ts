import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-zoomer',
  templateUrl: './zoomer.component.html',
  styleUrls: ['./zoomer.component.scss'],
})
export class ZoomerComponent {
  @Input() zoom = 5;

  @Input() zoomMin = 1;
  @Input() zoomMax = 10;
  @Input() zoomStep = 10;
  quantum = 1;
  hint = 'Dragging slider to zoom in or out';
  @Output() zoomChange = new EventEmitter<number>();

  formControl = new FormControl(5);

  constructor() {
    this.formControl.valueChanges.subscribe((value) => {
      if (value == undefined) {
        return;
      }
      this.zoom = value;
      this.zoomChange.emit(value);
    });
  }
}
