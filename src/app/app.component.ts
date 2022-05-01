import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import monsters from '../assets/monster-mapping.json';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

interface monster {
  en: string;
  es: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'monsters';
  spanishControl = new FormControl();
  englishControl = new FormControl();
  spanish = monsters.map((m: monster) => m.es);
  english = monsters.map((m: monster) => m.en);
  filteredSpanish: Observable<string[]> | undefined;
  filteredEnglish: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredSpanish = this.spanishControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.spanish))
    );
    this.filteredEnglish = this.englishControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.english))
    );
  }

  public getEnglish(option: string) {
    this.englishControl.setValue(monsters.find((m) => m.es == option)?.en);
  }

  public getSpanish(option: string) {
    this.spanishControl.setValue(monsters.find((m) => m.en == option)?.es);
  }

  private _filter(value: string, list: string[]): string[] {
    const filterValue = value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return list.filter((option) =>
      option
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(filterValue)
    );
  }
}
