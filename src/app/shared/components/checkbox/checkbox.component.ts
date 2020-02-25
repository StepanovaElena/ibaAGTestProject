import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

//const VALUE_ACCESSOR: Provider = {
 // provide: NG_VALUE_ACCESSOR,
//  useExisting: forwardRef(() => CheckboxComponent),
 // multi: true,
//};
//implements ControlValueAccessor
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  //providers: [VALUE_ACCESSOR]
})
export class CheckboxComponent implements OnInit{


  @Input() label: string;
  @Input() value: any;
  @Input() desabled: boolean;
  @Input() state: boolean;

  setState(state: boolean) {
    this.state = state;
  }

  ngOnInit(): void {
  }

 // writeValue(state: boolean): void {
 //   this.state = state;
 // }

 // registerOnChange(fn: any): void {
 //   this.onChange = fn;
 // }

 // registerOnTouched(fn: any): void {
 // }

 // setDisabledState?(isDisabled: boolean): void {

 // }

 // private onChange = (value: any) =>  {
 // }

}
