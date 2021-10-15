import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GeneralFunctionsService {

  constructor(private toastrService: ToastrService) { }

  notifications(title: string, message: string, status: string) {
    var duration = 3000;

    if (status == 'error') {
      this.toastrService.error(message, title,{
        timeOut: duration,
      });
    }


    if (status == 'warning') {
      this.toastrService.warning(message, title,{
        timeOut: duration,
      });
    }


    if (status == 'success') {
      this.toastrService.success(message, title,{
        timeOut: duration,
      });
    }

  }
}
