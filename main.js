import ParkingSystem from "./ParkingSystem.js";
import ParkingUI from "./ParkingUI.js";

export default class ParkingController {
    constructor() {
        this.parkingUI = new ParkingUI();
        this.parkingSystem = new ParkingSystem();
        this.listVehicles();
    }

    park() {
        let regn = this.parkingUI.getRegistrationNumber().parkVehicleReg;
        
        let response = this.parkingSystem.vehicleEntryRequest(regn);
        this.parkingUI.alertMessage(response,"park");

        this.parkingUI.resetFormFields();

        this.listVehicles();
    }

    unpark() {
        let regn = this.parkingUI.getRegistrationNumber().unparkVehicleReg;

        let response = this.parkingSystem.vehicleExitRequest(regn);
        this.parkingUI.alertMessage(response,"unpark");

        this.parkingUI.resetFormFields();   

        this.listVehicles();
    }

    listVehicles() {
        let cars = this.parkingSystem.getAllCars();
        this.parkingUI.showRecent(cars);
        this.parkingUI.showAll(cars);
    }
}

const parkingController = new ParkingController();

const parkBtn = document.querySelector('#park button')
parkBtn.addEventListener('click', () => {
    parkingController.park();
});

const unparkBtn = document.querySelector('#unpark button')
unparkBtn.addEventListener('click', () => {
    parkingController.unpark();
});