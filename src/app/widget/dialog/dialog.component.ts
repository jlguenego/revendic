import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() title = 'Default Title';

  @Output() close = new EventEmitter<undefined>();

  onClose($event) {
    if ($event.currentTarget !== $event.target) {
      return;
    }
    console.log('onClose');
    this.close.emit();
  }

}
