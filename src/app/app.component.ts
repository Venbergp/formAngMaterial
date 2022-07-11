import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  workPlaceOptions: string[] = ['1infinnity', '2infinnity', '3infinnity']
  // @ts-ignore
  filteredOptions: Observable<string[]>
  formSendStatus : boolean = false


  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    secondName: [''],
    birthDay: ['', Validators.required],
    sex: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.email],
    workPlace: ['']
  })

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    //console.log(this.profileForm)

    this.filteredOptions = this.profileForm.controls.workPlace.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value || '')
      }),
    );
  }

  sendForm(): void {
    this.formSendStatus = true
  }

  logForm(): void {
    console.log(this.profileForm)
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //console.log(this.workPlaceOptions.filter(option => option.toLowerCase().includes(filterValue)))
    return this.workPlaceOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
