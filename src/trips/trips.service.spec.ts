import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';

// tslint:disable-next-line: typedef
describe('TripsService', () => {
  let service: TripsService;

  // tslint:disable-next-line: typedef
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  // tslint:disable-next-line: typedef
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
