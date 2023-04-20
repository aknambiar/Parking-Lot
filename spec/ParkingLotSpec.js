import ParkingLot from "../ParkingLot.js";

describe("Unit Test Parking Lot:", function() {
    
    describe("Finding a parking slot", function() {
        let pl;
        beforeEach(function() {
            pl = new ParkingLot();
        });

        it("should find the first empty slot",function(){
            pl.lots = [,"A","B","C",,"D","E"];
            let slot = pl.findEmptySlot();
            
            expect(slot).toBe(4);
        });

        it("should return false if no slot is found",function(){
            pl.lots = [,"A","B","C","D"];
            let slot = pl.findEmptySlot();
            
            expect(slot).toBeFalsy();
        });

        it("should find the car with the provided registration",function(){
            let registration = "AB12345678";
            pl.lots[5] = registration;
            
            let slot = pl.findOccupiedSlot(registration);
            
            expect(slot).toBe(5);
        });

        it("should return false if no car is found",function(){
            let registration = "AB12345678";
            
            let slot = pl.findOccupiedSlot(registration);
            
            expect(slot).toBeFalsy();
        });
    });



    describe("Parking & Unparking a vehicle", function() {
        let pl;
        beforeEach(function() {
            pl = new ParkingLot();
        });

        it("should add a new car to the parking",function() {
            let registration = "GH12345678";
            let position = 5
            spyOn(pl,"findEmptySlot").and.returnValue(position);
            spyOn(pl,"updateRecent");

            pl.parkVehicle(registration);

            expect(pl.lots[position]).toBe(registration);
        })

        it("should remove a car from the parking",function() {
            let registration = "GH12345678";
            let position = 5
            pl.lots[position] = registration;
            spyOn(pl,"findOccupiedSlot").and.returnValue(position);

            pl.unparkVehicle(registration);

            expect(pl.lots[position]).toBe(undefined);
        })

        it("should add a car to the start of the recent cars list",function() {
            let registration = "GH12345678";

            pl.updateRecent(registration);

            expect(pl.recent[0]).toBe(registration);
        })


    })
})

describe("Integration Test Parking Lot:", function() {
    
    describe("Parking & Unparking a vehicle", function() {
        let pl;
        beforeEach(function() {
            pl = new ParkingLot();
        });

        it("should add a new car to the parking",function() {
            let registration = "GH12345678";
            let position = 5

            pl.parkVehicle(registration);

            expect(pl.lots.indexOf(registration)).toBeTruthy();
        })

        it("should remove a car from the parking",function() {
            let registration = "GH12345678";
            let position = 5
            pl.lots[position] = registration;

            pl.unparkVehicle(registration);

            expect(pl.lots[position]).toBe(undefined);
        })
    })

})