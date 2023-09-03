import { Component } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    // this.httpClientService.get<Product>({
    //   controller: "Products"
    // }, 1).subscribe(data => console.log(data.name))
    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Kalem",
    //   stock: 12,
    //   price: 20
    // }).subscribe();
    // this.httpClientService.put({
    //   controller: "products"
    // },
    //   {
    //     id: 1,
    //     name: "kaleeem"
    //   }).subscribe();
    // this.httpClientService.delete({
    //   controller: "products"
    // }, 1).subscribe();
  }
}
