import ParkingSystem from "./ParkingSystem.js";
import ParkingUI from "./ParkingUI.js";

export default class ParkingController {
    constructor() {
        this.parkingui = new ParkingUI();
        this.parkingsystem = new ParkingSystem();
        this.listVehicles();
    }

    park() {
        let regn = this.parkingui.getRegistrationNumber().parkVehicleReg;
        
        let response = this.parkingsystem.vehicleEntryRequest(regn);
        this.parkingui.parkedAlert(response);

        this.parkingui.resetFormFields();

        this.listVehicles();
    }

    unpark() {
        let regn = this.parkingui.getRegistrationNumber().unparkVehicleReg;

        let response = this.parkingsystem.vehicleExitRequest(regn);
        this.parkingui.unparkedAlert(response);

        this.parkingui.resetFormFields();   

        this.listVehicles();
    }

    listVehicles() {
        let cars = this.parkingsystem.getAllCars();
        this.parkingui.showRecent(cars);
        this.parkingui.showAll(cars);
    }
}

const parkingcontroller = new ParkingController();

const parkBtn = document.querySelector('#park button')
parkBtn.addEventListener('click', () => {
    parkingcontroller.park();
});

const unparkBtn = document.querySelector('#unpark button')
unparkBtn.addEventListener('click', () => {
    parkingcontroller.unpark();
});