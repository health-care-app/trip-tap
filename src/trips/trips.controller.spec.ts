import { Test, TestingModule } from '@nestjs/testing';

import { CustomerTripsController } from './customer.trips.controller';

describe('Trips Controller', (): void => {
  let controller: CustomerTripsController;

  beforeEach(async(): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerTripsController],
    }).compile();

    controller = module.get<CustomerTripsController>(CustomerTripsController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });
});
