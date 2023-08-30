import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductsComponent } from './admin/components/products/products.component';
import { HomeLayoutComponent } from './ui/home-layout/home-layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) }

    ]
  },
  {
    path: "", component: HomeLayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
