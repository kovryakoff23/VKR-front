import { Component, OnInit } from '@angular/core';
import {MyWorker} from "../worker/worker";
import {WorkerService} from "../worker/worker.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Suppliers} from "./suppliers";
import {SuppliersService} from "./suppliers.service";
import {Salary} from "../worker/salary";
import {Payment} from "./payment";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {SalaryWorker} from "../salary-worker/salary-worker";
import {PaymentSuppliers} from "../payment-suppliers/payment-suppliers";
import {PaymentSuppliersService} from "../payment-suppliers/payment-suppliers.service";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  search : string;
  suppliers: Array<Suppliers>;
  supplier: Suppliers;
  isAdd: boolean = false;
  dateStartPay : Date;
  dateEndPay : Date;
  payments: Array<Payment>;
  paymentSuppliers: Array<PaymentSuppliers>;
  message: string;
  constructor(private serv: SuppliersService, private route: ActivatedRoute,
              private paymentSuppliersService: PaymentSuppliersService,public dialog: MatDialog, private router: Router) {
    this.suppliers = new Array<Suppliers>();
    this.supplier = new Suppliers();
    this.payments = new Array<Payment>();
    this.paymentSuppliers = new Array<PaymentSuppliers>();
    this.loadSuppliers();
  }
  public getSearch(){
    console.log(this.search)
    if(this.search != undefined && this.search !='' && this.search!=null) {
      this.serv.findAllSearch(this.search).subscribe(data => {
        this.suppliers = data;
        console.log(data);
      });
    }
    else{
      this.serv.findAll().subscribe(data => {
        this.suppliers = data;
        console.log(data);
      });
    }
  }
  findByDate(){
    this.serv.findByDate(this.dateStartPay, this.dateEndPay).subscribe(date=>{
      this.payments=date;
    });
  }
  backClicked(){
    this.isAdd=false;
  }
  onSubmit() {
    if(this.isAdd) {
      this.serv.save(this.supplier).subscribe(result =>
        this.suppliers);
      this.isAdd = false;
      location.reload();
    }
  }
  ngOnInit() {
    this.loadSuppliers();
  }

  private loadSuppliers() {
    this.serv.findAll().subscribe((data: Array<Suppliers>) => {
      this.suppliers = data;
      this.serv.findAllPayment().subscribe(data=>{
        this.payments=data;
        this.paymentSuppliersService.findAll().subscribe(data2=>{
          this.paymentSuppliers=data2;
        })
      });
    });
  }
  editSupplier(supplier: Suppliers){
    this.supplier=supplier;
    this.isAdd=true;
  }
  openDialog(supplier: Suppliers) {
    this.message= "Вы действительно хотите удалить всю информацию об этом постащике?";
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: 'auto',
      height: 'auto',
      data: {message: this.message},
    });
    dialogRef.afterClosed().subscribe((result)=> {
      console.log("result = "+result)
      if (result==true){
        this.serv.deleteSupplier(supplier.id).subscribe(value => {
          this.loadSuppliers();
        });
      }
    });
  }
  public addSupplier(){
    this.isAdd = true;
  }
  public openDetails(supplier : Suppliers){
    this.serv.setId(supplier.id);
    this.serv.setSupplier(supplier);
    this.router.navigate(['/home/suppliers-positions']);
  }
  public openPaymentDetails(payment : Payment){
    this.serv.setId(payment.suppliers.id);
    this.serv.setSupplier(payment.suppliers);
    console.log(this.serv.getId());
    this.router.navigate(['/home/payment-suppliers']);
  }
  public updateStatus(paymentSuppliers: PaymentSuppliers){
    this.paymentSuppliersService.updateStatusPayment(paymentSuppliers).subscribe(data=>{
      this.loadSuppliers();});
  }
}
