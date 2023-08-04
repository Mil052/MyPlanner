import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNumberOfDays]'
})
export class NumberOfDaysDirective {

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef) { }

  @Input() set appNumberOfDays(numberOfDays: number) {
    this.container.clear();
    for (let i = 1; i <= numberOfDays; i++) {
      this.container.createEmbeddedView(this.template, {$implicit: i});
    }
  }
}
