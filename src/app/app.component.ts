import { Component } from '@angular/core';
import { LodersService } from './shared/services/loders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'httpMaterialFirebase';
isLoading !: boolean ;  

constructor(
private _loaderService : LodersService
){

}

ngOnInit(): void {
  this._loaderService.loadingState$
  .subscribe(res => {
    this.isLoading = res
  })
}
  openSidebar(sidebar: any) {
    sidebar.open()
  }


}
