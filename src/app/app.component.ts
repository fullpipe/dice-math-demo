import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { roll } from 'ts-dice-math';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rolled: number | null = null;
  error: string | null = null;
  exp!: FormControl;

  dices: { exp: string; info: string }[] = [
    { exp: 'd4', info: 'd4' },
    { exp: 'd6', info: 'd6' },
    { exp: 'd8', info: 'd8' },
    { exp: 'd10', info: 'd10' },
    { exp: 'd12', info: 'd12' },
    { exp: 'd20', info: 'd20' },
    { exp: '2d6 + 3', info: 'Your two-handed sword damage' },
    { exp: 'adv(d20, d20)', info: 'd20 with advantage' },
    { exp: 'dis(d20, d20)', info: 'd20 with disadvantage' },
    {
      exp: 'adv(d20, d20) + 3',
      info: 'd20 with advantage with wisdom modifier',
    },
    {
      exp: 'd100 / 3 + adv(d20, d20) * 2 - dis(d100, d100, d6)',
      info: 'what ever',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.exp = this.formBuilder.control('');
    this.exp.valueChanges.subscribe((v) => this.doRoll(v));
  }

  roll(exp: string) {
    this.exp.setValue(exp);
  }

  doRoll(exp: string) {
    try {
      this.rolled = roll(exp);
      this.error = null;
    } catch (error) {
      this.error = String(error);
      this.rolled = null;
    }
  }

  reroll() {
    this.exp.updateValueAndValidity();
  }
}
