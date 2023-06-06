import ParkingLot from "./ParkingLot.js";

export default class ParkingSystem {
    constructor() {
        this.parkingLot = new ParkingLot();
        this.readStorage();
    }

    vehicleEntryRequest(regn) {
        let response = "invalid";

        if (this.validateRegn(regn)) {
            response = this.parkingLot.parkVehicle(regn);
            this.writeStorage();
        }

        return response;
    }

    vehicleExitRequest(regn) {
        let response = "invalid";

        if (this.validateRegn(regn)) {
            response = this.parkingLot.unparkVehicle(regn);
            this.writeStorage();
        }

        return response;
    }

    validateRegn(regn) {
        if (regn.length > 10) { return false;}
        const re = new RegExp("[A-Za-z]{2}[0-9]{8}");
        return re.test(regn);
    }

    getAllCars() {
        return this.parkingLot.getData();
    }

    readStorage() {
        if (localStorage.getItem("recent") && localStorage.getItem("lots")) {
            const data = new Object();
            data.recent = JSON.parse(localStorage.getItem("recent"));
            data.lots = JSON.parse(localStorage.getItem("lots"));
            this.parkingLot.setData(data);
        }
    }

    writeStorage() {
        const data = this.parkingLot.getData()
        localStorage.setItem("recent", JSON.stringify(data.recent));
        localStorage.setItem("lots", JSON.stringify(data.lots));
    }
}