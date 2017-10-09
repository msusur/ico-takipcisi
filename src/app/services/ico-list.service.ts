import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IcoModel } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class IcoListService {
  constructor(private http: Http) {}

  public getIcoModel(endpointUri: string): Observable<IcoModel[]> {
    if (!endpointUri) {
      throw new Error('You must specify the endpoint.');
    }

    return this.http.get(endpointUri).map(this.extractData);
  }

  private extractData(res: Response): IcoModel[] {
    const body: any = res.json();
    if (!body) {
      throw new Error('Response cannot be empty!');
    }

    return body;
  }
}
