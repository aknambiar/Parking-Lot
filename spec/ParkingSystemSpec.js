import ParkingSystem from "../ParkingSystem.js";
import ParkingLot from "../ParkingLot.js";
import "jasmine-local-storage";

describe("Unit Testing Parking System: ", function() {
    describe("Registration No.",function() {
        let psys;

        beforeEach(function() {
            mockLocalStorage();
            spyOn(ParkingLot, 'constructor').and.returnValue({})
            psys = new ParkingSystem();
        });
        
        it("accepts the correct format and length", function() {
            let registrationNumber = "AB12345678";
            let result = psys.validateRegn(registrationNumber);
            expect(result).toBe(true);
        });
    
        it("rejects a number that is too short", function() {
            let registrationNumber = "AB1234567";
            let result = psys.validateRegn(registrationNumber);
            expect(result).toBe(false);
        });
    
        it("rejects a number that is too long", function() {
            let registrationNumber = "AB123456789";
            let result = psys.validateRegn(registrationNumber);
            expect(result).toBe(false);
        });
    
        it("rejects a number in an incorrect format", function() {
            let registrationNumber = "ABCDE12345";
            let result = psys.validateRegn(registrationNumber);
            expect(result).toBe(false);
        });
    });



    describe ("Parking a car", function() {
        let psys;

        beforeEach(function() {
            mockLocalStorage();
            psys = new ParkingSystem();
        });

        it(" should return invalid if number validation fails",function(){
            spyOn(psys,"validateRegn").and.returnValue(false);

            let result = psys.vehicleEntryRequest();
            
            expect(result).toBe("Invalid");
        });

        it(" should provide a proper response if number is valid",function(){
            spyOn(psys,"validateRegn").and.returnValue(true);
            spyOn(psys.parkingLot,"parkVehicle").and.returnValue("Car Parked");

            let result = psys.vehicleEntryRequest();
            
            expect(result).not.toBe("Invalid");
        });
    });



    describe ("Unparking a car", function() {
        let psys;

        beforeEach(function() {
            mockLocalStorage();
            psys = new ParkingSystem();
        });

        it(" should return invalid if number validation fails",function(){
            spyOn(psys,"validateRegn").and.returnValue(false);

            let result = psys.vehicleExitRequest();
            
            expect(result).toBe("Invalid");
        });

        it(" should provide a proper response if number is valid",function(){
            spyOn(psys,"validateRegn").and.returnValue(true);
            spyOn(psys.parkingLot,"parkVehicle").and.returnValue("Car Unparked");

            let result = psys.vehicleExitRequest();
            
            expect(result).not.toBe("Invalid");
        });
    });



    describe ("Getting all cars", function() {
        let psys;

        beforeEach(function() {
            mockLocalStorage();
            psys = new ParkingSystem();
        });

        it(" should return some data",function(){
            let carObject = {a:1,b:2}
            spyOn(psys.parkingLot,"getData").and.returnValue(carObject);

            let result = psys.getAllCars();
            
            expect(result).toBe(carObject);
        });
    });
});



describe("Integration Test Parking Lot:", function() {
    
    describe("Parking & Unparking a vehicle", function() {
        let psys;

        beforeEach(function() {
            mockLocalStorage();
            psys = new ParkingSystem();
        });

        it(" should provide a proper response if number is valid",function(){
            let registration = "AB12345678";

            let result = psys.vehicleEntryRequest(registration);
            
            expect(result).toBe(1);
        });
    })

})