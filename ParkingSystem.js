import ParkingLot from "./ParkingLot.js";

export default class ParkingSystem {
    constructor() {
        this.parkinglot = new ParkingLot();
        this.readStorage();
    }

    vehicleEntryRequest(regn) {
        let response = "Invalid";

        if (this.validateRegn(regn)) {
            response = this.parkinglot.parkVehicle(regn);
            this.writeStorage();
        }

        return response;
    }

    vehicleExitRequest(regn) {
        let response = "Invalid";

        if (this.validateRegn(regn)) {
            response = this.parkinglot.unparkVehicle(regn);
            this.writeStorage();
        }

        return response;
    }

    validateRegn(Regn) {
        if (Regn.length > 10) { return false;}
        const re = new RegExp("[A-Za-z]{2}[0-9]{8}");
        return re.test(Regn);
    }

    getAllCars() {
        return this.parkinglot.getData();
    }

    readStorage() {
        if (localStorage.getItem("recent") && localStorage.getItem("lots")) {
            const data = new Object();
            data.recent = JSON.parse(localStorage.getItem("recent"));
            data.lots = JSON.parse(localStorage.getItem("lots"));
            this.parkinglot.setData(data);
        }
    }

    writeStorage() {
        const data = this.parkinglot.getData()
        localStorage.setItem("recent", JSON.stringify(data.recent));
        localStorage.setItem("lots", JSON.stringify(data.lots));
    }
}