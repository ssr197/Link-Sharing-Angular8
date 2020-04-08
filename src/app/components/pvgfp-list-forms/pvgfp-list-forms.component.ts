import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PvgfpService } from '../../service/pvgfp.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SpinnerService } from '../../service/spinner.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pvgfp-list-forms',
  templateUrl: './pvgfp-list-forms.component.html',
  styleUrls: ['./pvgfp-list-forms.component.css']
})
export class PvgfpListFormsComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  formListData: any;
  dtTrigger: Subject<any> = new Subject();

  constructor(private pvgfplistService : PvgfpService, private pageTitleService: PageTitleService, private _spinnerService : SpinnerService) {
    this._spinnerService.display(true);
  }
  ngOnInit() {
      this.pageTitleService.setTitle("FORM LIST");
      this.dtOptions = {
        columnDefs: [{
            targets: [1], /* column index */
            orderable: false, /* true or false */
        }],
        searching: false,
        pageLength: 25,
        order: [3,'desc']
      };

    this.pvgfplistService.getFormList().subscribe(data => {
        this.formListData = data.data;
        this.dtTrigger.next();
        this._spinnerService.display(false);
      });
  };

  ngAfterViewInit(){
    setTimeout(() => {
      this.pageTitleService.showTools(false);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(form, idx) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, same form will not be recovered !",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
    .then((willDelete) => {
      if(willDelete.value){
        this.pvgfplistService.deleteForm(form.Form_Id).subscribe(message => {
          this.formListData.splice(idx,1);
          this.pvgfplistService.showSuccess("Form: "+this.formListData[idx].Form_Name+ " Deleted Successfully", 3000)
        })
      }
    });
  }
}
