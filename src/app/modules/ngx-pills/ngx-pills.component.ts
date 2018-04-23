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

  /**
   * Add new pill
   *
   * @param {String} text
   * @memberof NgxPillsComponent
   */
  addPill(text) {
    this.pills.push(text);
  }

  /**
   * Can add more pills or not depend on maxPills
   *
   * @returns {Boolean}
   * @memberof NgxPillsComponent
   */
  canAddPill() {
    return this.pills.length < this.maxPills;
  }

  /**
   * Return true if passed value exists in pills
   *
   * @param {any} text
   * @returns {Boolean}
   * @memberof NgxPillsComponent
   */
  isDuplicate(text) {
    return this.pills.indexOf(text) === -1 ? false : true;
  }


  /**
   * Mark item as duplicated
   *
   * @param {String} text
   * @memberof NgxPillsComponent
   */
  markAsDuplicate(text) {
    this.duplicate = text;
  }

  /**
   * Reset duplicate value
   *
   * @memberof NgxPillsComponent
   */
  resetDuplicate() {
    this.duplicate = '';
  }

  /**
   * Remove item from pills
   *
   * @param {any} text
   * @memberof NgxPillsComponent
   */
  removePill(text) {
    this.pills.splice(this.pills.indexOf(text), 1);
  }

  /**
   * Remove last item from pills
   *
   * @memberof NgxPillsComponent
   */
  removeLastPill() {
    if (this.pills.length > 0) {
      const lastKey = this.pills[this.pills.length - 1];
      this.removePill(lastKey);
    }
  }

  /**
   * Clear value in textbox
   *
   * @memberof NgxPillsComponent
   */
  clearTextbox() {
    this.pillsTextbox.nativeElement.value = '';
  }

  /**
   * Handle keydown event on textbox
   *
   * @param {any} $event
   * @memberof NgxPillsComponent
   */
  onKeydown($event) {
    switch ($event.key) {
      case 'Backspace': this.onBackspaceKeydown($event); break;
      case 'Enter': this.onEnterKeydown($event); break;
      default: this.onAnyOtherKeyDown($event); break;
    }
  }

  /**
   * Handle enter keydown event on textbox
   *
   * @param {any} $event
   * @memberof NgxPillsComponent
   */
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

  /**
   * Handle backspace keydown event on textbox
   *
   * @param {any} $event
   * @returns
   * @memberof NgxPillsComponent
   */
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

  /**
   * Handle any keydown event on textbox except enter and backspace
   *
   * @param {any} $event
   * @memberof NgxPillsComponent
   */
  onAnyOtherKeyDown($event) {
    this.backpacePressed = false;
    this.resetDuplicate();
  }
}
