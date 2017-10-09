import { async, inject, TestBed } from '@angular/core/testing';
import {
  BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { IcoModel } from '../models';
import { IcoListService } from './ico-list.service';

describe('IcoListService', () => {
  let mockBackend: MockBackend;
  let service: IcoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory:
          (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        IcoListService,
        BaseRequestOptions,
        MockBackend
      ]
    });
  });

  beforeEach(inject(
    [MockBackend, IcoListService],
    (_mockBackend_: MockBackend, _service_: IcoListService) => {
      mockBackend = _mockBackend_;
      service = _service_;
    }));

  describe('getIcoModel', () => {
    it('should throw error if endpointUri is falsy', (): void => {
      // Act + Assert
      expect(
        (): Observable<IcoModel[]> => service.getIcoModel(undefined)
      ).toThrow(new Error('You must specify the endpoint.'));
    });

    it('returns IcoModel array', async((): void => {
      // Arrange
      const mockIcoModels: IcoModel[] = [
        new IcoModel('title', 'description', 'url1', 'url2'),
        new IcoModel('title', 'description', 'url1', 'url2')
      ];

      mockBackend.connections
        .subscribe((connection: MockConnection) => {
          const responseOpts: ResponseOptions = new ResponseOptions({
            body: JSON.stringify(mockIcoModels)
          });
          connection.mockRespond(new Response(responseOpts));
        });

      // Act + Assert
      service.getIcoModel('url-to-IcoModel-feed')
        .subscribe((data: any) => {
          expect(JSON.stringify(data))
            .toEqual(JSON.stringify(mockIcoModels));
        });
    }));

    it('should throw error when response body is falsy', async((): void => {
      // Arrange
      mockBackend.connections
        .subscribe((connection: MockConnection) => {
          const responseOpts: ResponseOptions = new ResponseOptions({
            body: JSON.stringify(null)
          });
          connection.mockRespond(new Response(responseOpts));
        });

      // Act + Assert
      expect(service.getIcoModel.bind('url-to-IcoModel-feed')).toThrow();
    }));
  });
});
