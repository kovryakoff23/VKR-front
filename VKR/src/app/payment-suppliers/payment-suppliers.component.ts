import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SalaryWorker} from "../salary-worker/salary-worker";
import {SalaryWorkerService} from "../salary-worker/salary-worker.service";
import {Location} from "@angular/common";
import {PaymentSuppliers} from "./payment-suppliers";
import {PaymentSuppliersService} from "./payment-suppliers.service";

@Component({
  selector: 'app-payment-suppliers',
  templateUrl: './payment-suppliers.component.html',
  styleUrls: ['./payment-suppliers.component.scss']
})
export class PaymentSuppliersComponent implements OnInit {


//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;

  public editedPaymentSuppliers: PaymentSuppliers |null = null;
  public paymentSuppliers: Array<PaymentSuppliers>;
  isNewRecord: boolean = false;
  isAdd : boolean = false;
  statusMessage: string = "";

  constructor(private serv: PaymentSuppliersService, private _location: Location) {
    this.paymentSuppliers = new Array<PaymentSuppliers>();
  }

  ngOnInit() {
    this.loadPaymentSuppliers();
  }

  backClicked() {
    this._location.back();
  }

  //загрузка пользователей
  private loadPaymentSuppliers() {
    this.serv.findAllByDate().subscribe((data: Array<PaymentSuppliers>) => {
      this.paymentSuppliers = data;
    });
  }

  // добавление пользователя
  public addPaymentSuppliers() {
    this.editedPaymentSuppliers = new PaymentSuppliers("",new Date(), null,"","",true,false,0);
    this.paymentSuppliers.push(this.editedPaymentSuppliers);
    this.isNewRecord = true;
  }


  public editPaymentSuppliers(paymentSupplier: PaymentSuppliers) {
    this.editedPaymentSuppliers = new PaymentSuppliers(paymentSupplier.id,paymentSupplier.datePay, paymentSupplier.dateExecution,
      paymentSupplier.unitName, paymentSupplier.namePosition, paymentSupplier.status, paymentSupplier.statusExecution, paymentSupplier.sumPay);
  }


  public loadTemplate(paymentSupplier: PaymentSuppliers) {
    if (this.editedPaymentSuppliers && this.editedPaymentSuppliers.id === paymentSupplier.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  public savePaymentSuppliers() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createPaymentSuppliers(this.editedPaymentSuppliers as PaymentSuppliers).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadPaymentSuppliers();
      });
      this.isNewRecord = false;
      this.editedPaymentSuppliers = null;
    } else {
      // изменяем пользователя
      this.serv.createPaymentSuppliers(this.editedPaymentSuppliers as PaymentSuppliers).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadPaymentSuppliers();
      });
      this.editedPaymentSuppliers = null;
    }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.paymentSuppliers.pop();
      this.isNewRecord = false;
    }
    this.editedPaymentSuppliers = null;
  }
  // удаление пользователя
  public deletePaymentSuppliers(salaryWorker: SalaryWorker) {
    console.log(salaryWorker.id);
    this.serv.deletePaymentSuppliers(salaryWorker.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadPaymentSuppliers();
    });
  }
  public updateStatus(paymentSuppliers: PaymentSuppliers){
    this.serv.updateStatusPayment(paymentSuppliers).subscribe((data) => {
      this.loadPaymentSuppliers();
    });
  }
}
