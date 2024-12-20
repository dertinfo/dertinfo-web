import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import * as domHelper from '../../helpers/dom.helper';

@Directive({ selector: '[appAccordion]' })
export class AppAccordionDirective implements OnInit {
  parentLi;

  constructor(private el: ElementRef) { }
  ngOnInit() {
    setTimeout(() => {
      this.el.nativeElement.className += 'accordion-handle';
      if (domHelper.hasClass(this.el.nativeElement, 'app-accordion')) {
        this.parentLi = this.el.nativeElement;
      } else {
        this.parentLi = domHelper.findClosest(this.el.nativeElement, 'app-accordion');
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick($event) {
    this.toggleOpen();
  }

  private toggleOpen() {
    const accordionItems = document.getElementsByClassName('app-accordion');
    if (domHelper.hasClass(this.parentLi, 'open')) {
      domHelper.removeClass(accordionItems, 'open');
    } else {
      domHelper.removeClass(accordionItems, 'open');
      domHelper.addClass(this.parentLi, 'open');
    }
  }

}
