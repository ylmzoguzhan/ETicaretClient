import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { Get_Product, List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    console.log("servis çalıştı")
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      console.log(result);
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`
        });
      });
      errorCallBack(message);
    })
  }

  async list(page: number = 0, pageSize: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product> {
    const promiseData: Promise<List_Product> = this.httpClientService.get<List_Product>({
      controller: "products",
      queryString: `page=${page}&pageSize=${pageSize}`
    }).toPromise();
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallBack(errorResponse.message)
      })
    return await promiseData;
  }

  async get(id: number): Promise<Get_Product> {
    const data: Promise<Get_Product> = this.httpClientService.get<Get_Product>({
      controller: "products"
    }, id = id).toPromise();
    return await data;
  }

  update(product: Get_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.put({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`
        });
      });
      errorCallBack(message);
    })
  }
  async delete(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    try {
      const deleteObservable = this.httpClientService.delete({
        controller: "Products"
      }, id)
      const response = await firstValueFrom(deleteObservable);
      if (successCallBack) {
        successCallBack();
      }
    } catch (errorResponse) {
      if (errorCallBack) {
        errorCallBack(errorResponse.message);
      }
    }
  }
}