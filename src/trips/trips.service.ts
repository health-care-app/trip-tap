import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';

import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.model';

@Injectable() //making it available for injection in other components.
export class TripsService {
  private trips: Trip[] = []; // <-- only accessible from the service itself.

  getAllTrips(): Trip[] { //grants us access to the trips array, when calling it from the controller.
    return this.trips;
  }

  getTripById(id: number): Trip {
    return this.trips.find(trip => trip.id === id);
  }

  createTrip(createTripDto: CreateTripDto): Trip {
    const { name, user } = createTripDto;

    const trip: Trip = {
      id: v1(),
      name,
      user,
    };

    this.trips.push(trip);
    return trip; //display the trip without an extra request.
  }

  deleteTrip(id: number): void {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }
}
