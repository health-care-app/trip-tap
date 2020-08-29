import { Test, TestingModule } from '@nestjs/testing';

import { CustomerTripsController } from './customer.trips.controller';

// tslint:disable-next-line: typedef
describe('Trips Controller', () => {
  let controller: CustomerTripsController;

  // tslint:disable-next-line: typedef
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerTripsController],
    }).compile();

    controller = module.get<CustomerTripsController>(CustomerTripsController);
  });

  // tslint:disable-next-line: typedef
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
