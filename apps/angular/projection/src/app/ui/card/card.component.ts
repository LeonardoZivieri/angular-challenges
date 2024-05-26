import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Directive,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';

@Directive({ selector: '[app-card-content]', standalone: true })
export class CardContentRefDirective {}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="cardClass()">
      <img [src]="img()" width="200px" />

      <section>
        @for (item of list(); track $index) {
          <ng-container
            *ngTemplateOutlet="
              template();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, CardContentRefDirective],
})
export class CardComponent {
  img = input.required<string>();
  list = input<any[] | null>(null);
  cardClass = input.required<string>();

  add = output<void>();

  template = contentChild.required(CardContentRefDirective, {
    read: TemplateRef,
  });

  addNewItem() {
    this.add.emit();
  }
}

export const CARD_IMPORTS = [CardComponent, CardContentRefDirective] as const;
