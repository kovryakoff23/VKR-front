import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnitFormComponent} from "./unit-form/unit-form.component";
import {UnitComponent} from "./unit/unit.component";
import {WorkerComponent} from "./worker/worker.component";
import {UnitInfoComponent} from "./unit-info/unit-info.component";
import {UnitNavigateComponent} from "./unit-navigate/unit-navigate.component";
import {UnitDeliveriesComponent} from "./unit-deliveries/unit-deliveries.component";
import {UnitDeliverComponent} from "./unit-deliver/unit-deliver.component";
import {UnitDeliverAddComponent} from "./unit-deliver-add/unit-deliver-add.component";
import {ProductionFormComponent} from "./production-form/production-form.component";
import {UnitProductionsComponent} from "./unit-productions/unit-productions.component";
import {UnitProductionPositionComponent} from "./unit-production-position/unit-production-position.component";
import {WorkerDetailsComponent} from "./worker-details/worker-details.component";
import {SuppliersComponent} from "./suppliers/suppliers.component";
import {SuppliersPositionsComponent} from "./suppliers-positions/suppliers-positions.component";
import {DialogWorkerComponent} from "./dialog-worker/dialog-worker.component";
import {DialogDeliversComponent} from "./dialog-delivers/dialog-delivers.component";
import {UnitWorkersComponent} from "./unit-workers/unit-workers.component";
import {ReportsComponent} from "./reports/reports.component";
import {UnitUpkeepComponent} from "./unit-upkeep/unit-upkeep.component";
import {UnitEquipmentRentalComponent} from "./unit-equipment-rental/unit-equipment-rental.component";
import {DocumentsComponent} from "./documents/documents.component";
import {ArchiveComponent} from "./archive/archive.component";
import {SalaryWorker} from "./salary-worker/salary-worker";
import {SalaryWorkerComponent} from "./salary-worker/salary-worker.component";
import {PaymentSuppliersComponent} from "./payment-suppliers/payment-suppliers.component";
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";
import {NotificationComponent} from "./notification/notification.component";
import {AppComponent} from "./app.component";
import {UnitSettingComponent} from "./unit-setting/unit-setting.component";
import {InformationComponent} from "./information/information.component";
import {ArchiveNavigateComponent} from "./archive-navigate/archive-navigate.component";


const routes: Routes = [
  { path: 'home/units', component: UnitComponent,
    children: [
      { path: 'unit-navigate', component: UnitNavigateComponent,
        children: [
          { path: 'unit-info', component: UnitInfoComponent},
          { path: 'unit-productions', component: UnitProductionsComponent},
          { path: 'unit-deliveries', component: UnitDeliveriesComponent},
          { path: 'unit-deliver-add', component: UnitDeliverAddComponent},
          { path: 'unit-deliver', component: UnitDeliverComponent},
          { path: 'production-form', component: ProductionFormComponent},
          { path: 'dialog-worker', component: DialogWorkerComponent},
          { path: 'dialog-delivers', component: DialogDeliversComponent},
          { path: 'unit-production-position', component: UnitProductionPositionComponent},
          { path: 'unit-workers', component: UnitWorkersComponent},
          { path: 'reports', component: ReportsComponent},
          { path: 'unit-upkeep', component: UnitUpkeepComponent},
          { path: 'unit-equipment-rental', component: UnitEquipmentRentalComponent},
          { path: 'unit-setting', component: UnitSettingComponent},
        ]},
      { path: 'add-unit', component: UnitFormComponent },
    ],
  },

  { path: 'home/notification', component: NotificationComponent},
  { path: 'home/archive', component: ArchiveComponent,
    children: [
      { path: 'archive-navigate', component: ArchiveNavigateComponent,
        children: [
          { path: 'unit-info', component: UnitInfoComponent},
          { path: 'unit-workers', component: UnitWorkersComponent},
          { path: 'reports', component: ReportsComponent},
          { path: 'unit-setting', component: UnitSettingComponent},
        ]},
      ]},
  { path: 'home/worker', component: WorkerComponent},
  { path: 'home/worker-details', component: WorkerDetailsComponent,
    children: [
      ]
  },
  { path: 'home/salary-worker', component: SalaryWorkerComponent},
  { path: 'home/dialog-delete', component: DialogDeleteComponent},
  { path: 'home/payment-suppliers', component: PaymentSuppliersComponent},
  { path: 'home/suppliers', component: SuppliersComponent },
  { path: 'home/suppliers-positions', component: SuppliersPositionsComponent},
  { path: 'home/information', component: InformationComponent},

  { path: '**', component: UnitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
