import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent },
      { path: "edit/:id", component: CreateProductComponent }
    ])
  ]
})
export class ProductsModule { }
