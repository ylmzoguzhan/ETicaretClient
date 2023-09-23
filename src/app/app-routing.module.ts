import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { ProductsComponent } from './admin/components/products/products.component';
import { HomeLayoutComponent } from './ui/home-layout/home-layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule), canActivate: [AuthGuard] }

    ], canActivate: [AuthGuard]
  },
  {
    path: "", component: HomeLayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
      { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
      { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
