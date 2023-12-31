import { Component, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { Get_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
declare var $: any
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class CreateProductComponent extends BaseComponent {
  urunID = 0;
  product: Get_Product = new Get_Product();
  images: List_Product_Image[];
  returnUrl = ""
  @Output() fileOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    description: "Resimleri seçin",
    accept: ".png, .jpg, .webp"
  }
  constructor(private route: ActivatedRoute, private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService, private router: Router) {
    super(spinner);
  }
  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.urunID = +params.get('id');
      this.fileOptions.queryString = `id=${this.urunID}`;
      if (this.urunID > 0) {
        this.product = await this.productService.get(this.urunID);
        this.images = await this.productService.getImages(this.urunID);
      }
      this.returnUrl = this.router.url;
      console.log(this.returnUrl);
    });
  }
  save(name: string, stock: number, price: number) {
    this.showSpinner(SpinnerName.BallScaleMultiple);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name;
    create_product.stock = stock;
    create_product.price = price;
    if (this.urunID === 0)
      this.create(create_product);
    else
      this.update(this.product);

  }
  create(create_product: Create_Product) {
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerName.BallScaleMultiple);
      this.alertify.message("Ürün eklendi", {
        position: AlertifyPosition.TopRight,
        messageType: AlertifyMessageType.Success,
        dismissOthers: true
      })
    }, errorMessage => {
      this.alertify.message(errorMessage, { messageType: AlertifyMessageType.Error, dismissOthers: true, position: AlertifyPosition.TopRight })
    });
  }
  update(update_product: Get_Product) {
    this.productService.update(update_product, () => {
      this.hideSpinner(SpinnerName.BallScaleMultiple);
      this.alertify.message("Ürün Güncellendi", {
        position: AlertifyPosition.TopRight,
        messageType: AlertifyMessageType.Success,
        dismissOthers: true
      })
    }, errorMessage => {
      this.alertify.message(errorMessage, { messageType: AlertifyMessageType.Error, dismissOthers: true, position: AlertifyPosition.TopRight })
    });
  }
  deleteImage(imageId: number) {
    const isConfirmed = window.confirm('Gerçekten silmek istiyor musunuz?');
    if (isConfirmed) {
      this.productService.deleteImage(this.urunID, imageId, () => {
        window.location.reload();
      })
    }

  }
}