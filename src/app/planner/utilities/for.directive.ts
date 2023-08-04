import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective {

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef) { }
  
  @Input() set appForOf(dataObject: {[id: number]: any} | null) {
    this.container.clear();
    if (dataObject && Object.keys(dataObject).length !== 0) {
      for (const elementId in dataObject) {
        this.container.createEmbeddedView(this.template, {$implicit: dataObject[elementId], elementId: elementId});
      }
    }
  }
}

// https://angular.io/guide/structural-directives