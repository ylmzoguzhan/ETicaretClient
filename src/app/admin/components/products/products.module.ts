import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FormsModule } from '@angular/forms';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ListProductComponent,
    CreateProductComponent,
    DeleteDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent },
      { path: "edit/:id", component: CreateProductComponent }
    ])
  ]
})
export class ProductsModule { }
