import { Test, TestingModule } from '@nestjs/testing';

import { TripsService } from './trips.service';

describe('TripsService', (): void => {
  let service: TripsService;

  beforeEach(async(): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });
});
