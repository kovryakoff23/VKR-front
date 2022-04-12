import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {UnitFormComponent} from "./unit-form/unit-form.component";
import {UnitService} from "./unit/unit-service.service";
import { UnitComponent } from './unit/unit.component';
import { WorkerComponent } from './worker/worker.component';
import { UnitInfoComponent } from './unit-info/unit-info.component';
import { UnitNavigateComponent } from './unit-navigate/unit-navigate.component';
import { ProductionFormComponent } from './production-form/production-form.component';
import {UnitDeliveriesComponent} from "./unit-deliveries/unit-deliveries.component";
import { UnitDeliverComponent } from './unit-deliver/unit-deliver.component';
import { UnitDeliverAddComponent } from './unit-deliver-add/unit-deliver-add.component';
import { UnitProductionsComponent } from './unit-productions/unit-productions.component';
import { UnitProductionPositionComponent } from './unit-production-position/unit-production-position.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersPositionsComponent } from './suppliers-positions/suppliers-positions.component';
import { DialogWorkerComponent } from './dialog-worker/dialog-worker.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {A11yModule} from '@angular/cdk/a11y';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import { DialogDeliversComponent } from './dialog-delivers/dialog-delivers.component';
import { UnitWorkersComponent } from './unit-workers/unit-workers.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import { ReportsComponent } from './reports/reports.component';
import {MatCardModule} from "@angular/material/card";
import { UnitUpkeepComponent } from './unit-upkeep/unit-upkeep.component';
import { UnitEquipmentRentalComponent } from './unit-equipment-rental/unit-equipment-rental.component';
import { DocumentsComponent } from './documents/documents.component';
import { ArchiveComponent } from './archive/archive.component';
import {MatTabsModule} from "@angular/material/tabs";
import { SalaryWorkerComponent } from './salary-worker/salary-worker.component';
import { PaymentSuppliersComponent } from './payment-suppliers/payment-suppliers.component';
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import { NotificationComponent } from './notification/notification.component';
import { UnitSettingComponent } from './unit-setting/unit-setting.component';
import { InformationComponent } from './information/information.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {OverlayModule} from "@angular/cdk/overlay";
import {CommonModule} from "@angular/common";
import { ArchiveNavigateComponent } from './archive-navigate/archive-navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitFormComponent,
    UnitComponent,
    WorkerComponent,
    UnitInfoComponent,
    UnitNavigateComponent,
    ProductionFormComponent,
    UnitDeliveriesComponent,
    UnitDeliverComponent,
    UnitDeliverAddComponent,
    UnitProductionsComponent,
    UnitProductionPositionComponent,
    WorkerDetailsComponent,
    SuppliersComponent,
    SuppliersPositionsComponent,
    DialogWorkerComponent,
    DialogDeliversComponent,
    UnitWorkersComponent,
    ReportsComponent,
    UnitUpkeepComponent,
    UnitEquipmentRentalComponent,
    DocumentsComponent,
    ArchiveComponent,
    SalaryWorkerComponent,
    PaymentSuppliersComponent,
    DialogDeleteComponent,
    NotificationComponent,
    UnitSettingComponent,
    InformationComponent,
    ArchiveNavigateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    A11yModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    NgxChartsModule,
    OverlayModule,
    /*    RouterModule.forRoot(appRoutes)*/
  ],
  providers: [UnitService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
    provide: MatDialogRef,
    useValue: {
      close: (dialogResult: any) => { }
    }
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
