import { Test, TestingModule } from '@nestjs/testing';

import { AuthTripsController } from './auth.trips.controller';

// tslint:disable-next-line: typedef
describe('Trips Controller', () => {
  let controller: AuthTripsController;

  // tslint:disable-next-line: typedef
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTripsController],
    }).compile();

    controller = module.get<AuthTripsController>(AuthTripsController);
  });

  // tslint:disable-next-line: typedef
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
