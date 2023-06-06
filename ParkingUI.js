//----
//  This class retreives data from HTML forms as well as  
//  updates the user about the result of an action.
//----

export default class ParkingUI {
    static responseList = {
        "invalid" : "Invalid Registration Number",
        "park_success" : "Parked at lot ",
        "park_failure" : "No space left!",
        "unpark_success" : "Unparked from lot ",
        "unpark_failure" : "Car not found!",
    }

    constructor() {
        this.parkMessage = document.querySelector('#parkResult');
        this.unparkMessage = document.querySelector('#unparkResult');

        this.parkVehicleReg = document.querySelector('#parkCarRegn');
        this.unparkVehicleReg = document.querySelector('#unparkCarRegn');

        this.carList = document.querySelector('#allcars ul');
        this.recentList = document.querySelector('#recent-list');
    }

    alertMessage(response,action) {
        if (response == "invalid") {
            this[action + "Message"].textContent = ParkingUI.responseList[response];
        }
        else if (response) {
            this[action + "Message"].textContent = ParkingUI.responseList[action + "_success"] + response;
        }
        else {
            this[action + "Message"].textContent = ParkingUI.responseList[action + "_failure"];
        }

        this[action + "Message"].classList.remove('d-none');
    }

    showAll(cars){
        this.carList.textContent = ''; //delete all child nodes

        for (var i = 1; i <= cars.lots.length; i++) {
            if (cars.lots[i] != undefined) {
                const listItem = this.createListItem(i,cars.lots[i])
                this.carList.appendChild(listItem);
            }
        }
    }

    createListItem(index,regn){
        const listItem = document.createElement('li');
        const listText = document.createElement('span');

        listItem.classList.add('list-group-item');
        listText.textContent = `${index.toString()} : ${regn}`;

        listItem.appendChild(listText);
        return listItem;
    }

    showRecent(cars) {
        if (!cars.recent.length) { return; } //if we don't have any recent cars
        this.recentList.textContent = ''; //delete all child nodes

        for (let index in cars.recent) {
            let regn = cars.recent[index];
            let position = cars.lots.indexOf(regn);
            const listItem = this.createRecentListItem(regn,position)
            this.recentList.appendChild(listItem);
        }
    }

    createRecentListItem(regn,position){
        const listItem = document.createElement('li');
        listItem.classList.add("list-group-item", "col-10", "col-lg-3", "border", "border-dark", "border-opacity-25", "rounded-pill", "border-2", "mx-4", "my-2");
        const listText = document.createElement('span');
        listText.textContent = `${regn} parked at lot ${position}`;
        
        if (position == -1)
        {
            listText.textContent = `${regn} already left!`;
        }

        listItem.appendChild(listText);
        return listItem
    }


    getRegistrationNumber() {
        return {
            parkVehicleReg: this.parkVehicleReg.value, 
            unparkVehicleReg: this.unparkVehicleReg.value
        }
    }

    resetFormFields() {
        this.parkVehicleReg.value = "";
        this.unparkVehicleReg.value = "";
    }
}