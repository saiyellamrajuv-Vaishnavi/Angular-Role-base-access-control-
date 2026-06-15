import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { beforeEach, describe } from 'node:test';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
});
