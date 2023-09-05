import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private htppClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  get<T>(requestParameter: Partial<RequestParemeters>, id?: number): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    return this.htppClient.get<T>(url, { headers: requestParameter.headers })
  }
  post<T>(requestParameter: Partial<RequestParemeters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    return this.htppClient.post<T>(url, body, { headers: requestParameter.headers });
  }
  put<T>(requestParameter: Partial<RequestParemeters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)} ${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    return this.htppClient.put<T>(url, body, { headers: requestParameter.headers })
  }
  delete<T>(requestParameter: Partial<RequestParemeters>, id: number): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    return this.htppClient.delete<T>(url, { headers: requestParameter.headers });
  }

  private url(requestParameter: Partial<RequestParemeters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/requestParameter.action` : ""}`
  }
}

export class RequestParemeters {
  controller?: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}