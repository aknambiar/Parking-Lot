import ParkingLot from "./parkinglot.js";
import ParkingResponse from "./parkingresponse.js";

class ParkingSystem {
    constructor() {
        this.parkVehicleReg = document.querySelector('#parkCarRegn');
        this.unparkVehicleReg = document.querySelector('#unparkCarRegn');

        this.parkinglot = new ParkingLot();
        this.parkingresponse = new ParkingResponse();

        this.readStorage();
    }

    vehicleEntryRequest() {
        let regn = this.parkVehicleReg.value;
        this.parkVehicleReg.value = ""; //Clear the field
        let response = "Invalid";

        if (this.validateRegn(regn)) {
            response = this.parkinglot.parkVehicle(regn);
        }

        this.parkingresponse.parkedAlert(response);
        this.updateRecentCars();
        this.writeStorage()
    }

    vehicleExitRequest() {
        let regn = this.unparkVehicleReg.value;
        this.unparkVehicleReg.value = ""; //Clear the field
        let response = "Invalid";

        if (this.validateRegn(regn)) {
            response = this.parkinglot.unparkVehicle(regn);
        }

        this.parkingresponse.unparkedAlert(response);
        this.writeStorage()
    }

    validateRegn(Regn) {
        const re = new RegExp("[A-Za-z]{2}[0-9]{8}");
        return re.test(Regn);
    }

    getAllCars() {
        let cars = this.parkinglot.getData().lots;
        this.parkingresponse.showAll(cars);
    }

    updateRecentCars() {
        let cars = this.parkinglot.getData()
        this.parkingresponse.showRecent(cars);
    }


    readStorage() {
        const data = new Object();
        if (localStorage.getItem("recent")) {
            data.recent = JSON.parse(localStorage.getItem("recent"));
        }
        if (localStorage.getItem("lots")) {
            data.lots = JSON.parse(localStorage.getItem("lots"));
        }
        this.parkinglot.setData(data)
        this.updateRecentCars();
    }

    writeStorage() {
        const data = this.parkinglot.getData()
        localStorage.setItem("recent", JSON.stringify(data.recent));
        localStorage.setItem("lots", JSON.stringify(data.lots));
    }
}




const parkingsystem = new ParkingSystem();

let parkBtn = document.querySelector('#park button')
parkBtn.addEventListener('click', () => {
    parkingsystem.vehicleEntryRequest();
})

let unparkBtn = document.querySelector('#unpark button')
unparkBtn.addEventListener('click', () => {
    parkingsystem.vehicleExitRequest();
})

let listBtn = document.querySelector('[data-bs-target="#allcars"]')
listBtn.addEventListener('click', () => {
    parkingsystem.getAllCars();
})