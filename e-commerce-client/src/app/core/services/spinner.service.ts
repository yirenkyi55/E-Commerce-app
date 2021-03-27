import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinnerService: NgxSpinnerService) {}

  showSpinner(fullScreen = true): void {
    this.spinnerService.show(undefined, {
      type: 'ball-clip-rotate-pulse',
      color: '#044a55f6',
      bdColor: 'rgba(255, 255, 255, 0.8)',
      fullScreen,
      size: 'medium',
    });
  }

  closeSpinner(): void {
    this.spinnerService.hide();
  }
}
