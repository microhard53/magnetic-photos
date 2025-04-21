import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DeliveryDetails } from '../shared/types';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class DeliveryDetailsComponent implements OnInit {
  @Output() deliveryDetailsChange = new EventEmitter<DeliveryDetails>();
  @Output() formSubmitted = new EventEmitter<void>();
  deliveryForm: FormGroup;
  isFormVisible = true;

  constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      deliveryDay: ['', [Validators.required]],
      specialInstructions: ['']
    });
  }

  ngOnInit(): void {
    const savedDetails = localStorage.getItem('deliveryDetails');
    if (savedDetails) {
      try {
        const details = JSON.parse(savedDetails);
        this.deliveryForm.patchValue(details);
      } catch (e) {
        console.error('Error parsing delivery details:', e);
      }
    }
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      const formValue = this.deliveryForm.value;
      const details: DeliveryDetails = {
        fullName: formValue.fullName,
        address: formValue.address,
        city: formValue.city,
        postalCode: formValue.postalCode,
        deliveryDay: formValue.deliveryDay,
        specialInstructions: formValue.specialInstructions
      };
      this.deliveryDetailsChange.emit(details);
      localStorage.setItem('deliveryDetails', JSON.stringify(details));
      this.isFormVisible = false;
      this.formSubmitted.emit();
    }
  }

  showForm() {
    this.isFormVisible = true;
  }
}