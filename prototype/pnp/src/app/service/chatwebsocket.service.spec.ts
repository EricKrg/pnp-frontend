import { TestBed } from '@angular/core/testing';

import { ChatwebsocketService } from './chatwebsocket.service';

describe('ChatwebsocketService', () => {
  let service: ChatwebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatwebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
