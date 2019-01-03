import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  faTimes = faTimes;
  constructor() { }

  ngOnInit() {
  }

  @Input() title = 'Default Title';

  @Output() close = new EventEmitter<undefined>();

  onClose($event, check = true) {
    if (check && $event.currentTarget !== $event.target) {
      return;
    }
    this.close.emit();
  }

}
