/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatabaseConnectionsService } from './database-connections.service';

describe('Service: DatabaseConnections', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseConnectionsService]
    });
  });

  it('should ...', inject([DatabaseConnectionsService], (service: DatabaseConnectionsService) => {
    expect(service).toBeTruthy();
  }));
});
