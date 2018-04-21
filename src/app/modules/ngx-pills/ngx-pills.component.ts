import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'ngx-pill',
  templateUrl: './ngx-pills.component.html',
  styleUrls: ['./ngx-pills.component.scss']
})
export class NgxPillsComponent implements OnInit {

  @ViewChild('pillsTextbox') pillsTextbox: ElementRef;
  @ViewChild('pillsContainer') pillsContainer: ElementRef;

  @Input()
  maxPills = 999;

  @Input()
  duplicateAllowed = false;

  @Input()
  placeholder = 'Type Here...';

  @Input()
  mainContainerClass = '';

  pills = ['pill1', 'pill2'];

  backpacePressed = false;
  duplicate = '';

  constructor() { }

  ngOnInit() {
  }

  addPill(text) {
    this.pills.push(text);
  }

  canAddPill() {
    return this.pills.length < this.maxPills;
  }

  isDuplicate(text) {
    return this.pills.indexOf(text) === -1 ? false : true;
  }

  markAsDuplicate(text) {
    this.duplicate = text;
  }

  resetDuplicate() {
    this.duplicate = '';
  }

  removePill(text) {
    this.pills.splice(this.pills.indexOf(text), 1);
  }

  removeLastPill() {
    if (this.pills.length > 0) {
      const lastKey = this.pills[this.pills.length - 1];
      this.removePill(lastKey);
    }
  }

  clearTextbox() {
    this.pillsTextbox.nativeElement.value = '';
  }

  onKeydown($event) {
    switch ($event.key) {
      case 'Backspace': this.onBackspaceKeydown($event); break;
      case 'Enter': this.onEnterKeydown($event); break;
      default: this.onAnyOtherKeyDown($event); break;
    }
  }

  onEnterKeydown($event) {
    const text: String = (this.pillsTextbox.nativeElement.value).trim();
    if (this.canAddPill() && text.length > 0) {
      if (this.duplicateAllowed) {
        this.addPill(text);
        this.clearTextbox();
      } else {
        if (!this.isDuplicate(text)) {
          this.addPill(text);
          this.clearTextbox();
        } else {
          this.markAsDuplicate(text);
        }
      }
    }
  }

  onBackspaceKeydown($event) {
    const text: String = this.pillsTextbox.nativeElement.value;
    if (!this.backpacePressed && text.length === 0) {
      this.backpacePressed = true;
      return;
    }
    this.backpacePressed = false;
    if (text.length === 0) {
      this.removeLastPill();
    }
  }

  onAnyOtherKeyDown($event) {
    this.backpacePressed = false;
    this.resetDuplicate();
  }
}
