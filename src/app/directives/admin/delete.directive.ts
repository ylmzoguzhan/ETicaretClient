import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private renderer: Renderer2, private httpClientService: HttpClientService, private alertifyService: AlertifyService, private router: Router) {
    const svgNS = 'http://www.w3.org/2000/svg'; // SVG namespace

    // SVG elementini oluştur
    const svg = this.renderer.createElement('svg', svgNS);
    this.renderer.setAttribute(svg, 'width', '20');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'stroke-width', '1.5');
    this.renderer.setAttribute(svg, 'stroke', 'currentColor');
    this.renderer.setAttribute(svg, 'class', 'w-6 h-6');

    // Path elementini oluştur
    const path = this.renderer.createElement('path', svgNS);
    this.renderer.setAttribute(path, 'stroke-linecap', 'round');
    this.renderer.setAttribute(path, 'stroke-linejoin', 'round');
    this.renderer.setAttribute(path, 'd', 'M6 18L18 6M6 6l12 12');

    // Path'i SVG içine ekleyin
    this.renderer.appendChild(svg, path);

    // SVG'yi bileşenin görünümüne ekleyin
    this.renderer.appendChild(this.element.nativeElement, svg);
  }
  @Input() controllerName: string;
  @HostListener("click")
  async onClick() {
    const isConfirmed = window.confirm('Gerçekten silmek istiyor musunuz?');
    if (isConfirmed) {
      var id = this.element.nativeElement.getAttribute('id')
      var returnURL = this.element.nativeElement.getAttribute('data-value')
      await this.httpClientService.generalDelete({
        controller: this.controllerName
      }, id, () => { this.router.navigateByUrl(returnURL), errorMessage => this.alertifyService.message("Hata", { messageType: AlertifyMessageType.Error, position: AlertifyPosition.TopRight }) });
    } else {

    }
  }
}
