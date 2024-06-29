import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
  formControl: FormControl = new FormControl('');
	_subscription!: Subscription;

	@Output() onChange = new EventEmitter<string>();

	constructor() {
		this._subscription = this.formControl.valueChanges.subscribe((value: string) => this.onChange.emit(value.trim()));
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
