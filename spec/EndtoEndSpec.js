import ParkingSystem from "../ParkingSystem.js";

describe("End to End Test",function(){

    let psys;

    beforeEach(function() {
        mockLocalStorage();
        psys = new ParkingSystem();
    });


    it("parks a car",function(){
        let registration = "AB12345678";

        let result = psys.vehicleEntryRequest(registration);

        expect(result).toBe(1);
    })

    it("unparks a car",function(){
        let registration = "CD82756434";
        psys.parkinglot.lots = [,"AB87639475","CD82756434","EF87264532"];

        let result = psys.vehicleExitRequest(registration);

        expect(result).toBe(2);
    })

    it("fails to park a car when no slots are available",function(){
        let registration = "AB12345678";
        psys.parkinglot.lots = [,"AB87639475","CD82756434","EF87264532"];
        psys.parkinglot.lots.length = 4;

        let result = psys.vehicleEntryRequest(registration);

        expect(result).toBeFalsy();
    })

    it("fails to unpark a car when it does not exist",function(){
        let registration = "AB12345678";
        psys.parkinglot.lots = [,"AB87639475","CD82756434","EF87264532"];

        let result = psys.vehicleExitRequest(registration);

        expect(result).toBeFalsy();
    })

    it("rejects an invalid registration number",function(){
        let registration = "AB123";

        let parkresult = psys.vehicleEntryRequest(registration);
        let unparkresult = psys.vehicleExitRequest(registration);

        expect(parkresult ==  "Invalid" && unparkresult ==  "Invalid").toBeTruthy();
    })
})