import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';
declare var $: any

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends BaseComponent {

  datas: List_Product;
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertifyService: AlertifyService, private renderer: Renderer2) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getProducts(0);
    if (this.pagination) {
      this.createLiElement(this.datas.totalCount);
    }
  }
  @ViewChild('pagination', { static: true }) pagination: ElementRef;

  async getProducts(page: number) {
    this.showSpinner(SpinnerName.BallScaleMultiple)
    this.datas = await this.productService.list(page, 5, () => { this.hideSpinner(SpinnerName.BallScaleMultiple), errorMessage => this.alertifyService.message("Hata", { messageType: AlertifyMessageType.Error, position: AlertifyPosition.TopRight }) });
  }
  createLiElement(count: number) {
    count = Math.ceil(count / 5);
    for (let i = 0; i < count; i++) {
      const liElement = this.renderer.createElement('li');
      const liText = this.renderer.createText(`${i + 1}`);
      this.renderer.setAttribute(liElement, 'value', i.toString());
      this.renderer.addClass(liElement, 'pagination-item');
      this.renderer.listen(liElement, 'click', (event) => {
        this.getProducts(i);
      });
      this.renderer.listen(liElement, 'click', (event) => {
        this.clickLi(event.target as HTMLLIElement);
      });
      this.renderer.appendChild(liElement, liText);
      this.renderer.appendChild(this.pagination.nativeElement, liElement);
    }
  }
  clickLi(clickedLi: HTMLLIElement): void {
    const allLiElements = this.pagination.nativeElement.querySelectorAll('.pagination-item');
    allLiElements.forEach((li: HTMLLIElement) => {
      this.renderer.removeClass(li, 'current');
    });
    this.renderer.addClass(clickedLi, 'current');
  }
}
