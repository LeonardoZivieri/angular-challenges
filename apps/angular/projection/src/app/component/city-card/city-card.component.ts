import { Component } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CARD_IMPORTS } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      img="assets/img/city.png"
      (add)="addNewCity()"
      cardClass="bg-blue-500/20">
      <ng-template app-card-content let-item>
        <app-list-item
          [name]="item.name"
          (delete)="deleteCity(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [``],
  standalone: true,
  imports: [...CARD_IMPORTS, ListItemComponent],
})
export class CityCardComponent {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
