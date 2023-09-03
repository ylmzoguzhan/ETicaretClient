import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';
declare var $: any
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class CreateProductComponent extends BaseComponent {
  urunID = 0;
  constructor(private route: ActivatedRoute, private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.urunID = +params.get('id'); // URL'den parametreyi al
    });
    if (this.urunID > 0) {
      $('.create').hide();
      $('.edit').show();
    } else {
      $('.create').show();
      $('.edit').hide();
    }
  }
  save(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerName.BallScaleMultiple);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
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

}
