//----
//  This class sends a response to the user based on  
//  the result of an action.
//----

export default class ParkingResponse {
    constructor(ParkingSpot) {
        this.parkedMessage = document.querySelector('#parkResult');
        this.unparkedMessage = document.querySelector('#unparkResult');
        this.carList = document.querySelector('#allcars ul');
        this.recentList = document.querySelector('#recent-list');
    }

    parkedAlert(response) {


        if (response == "Invalid") {
            this.parkedMessage.textContent = `Invalid Registration Number`;
        }
        else if (response) {
            this.parkedMessage.textContent = `Parked at lot ${response}`;
        }
        else {
            this.parkedMessage.textContent = "No space left!";
        }

        this.parkedMessage.classList.remove('d-none');  //Unhide the notification div
    }

    unparkedAlert(response) {
        if (response == "Invalid") {
            this.unparkedMessage.textContent = `Invalid Registration Number`;
        }
        else if (response) {
            this.unparkedMessage.textContent = `Unparked from lot ${response}`;
        }
        else {
            this.unparkedMessage.textContent = "Car not found!";
        }

        this.unparkedMessage.classList.remove('d-none');  //Unhide the notification div
    }

    showAll(cars) {
        this.carList.textContent = ''; //delete all child nodes

        for (var i = 1; i <= cars.length; i++) {
            if (cars[i] != undefined) {
                const listItem = document.createElement('li');
                const listText = document.createElement('span');

                listItem.classList.add('list-group-item');
                listText.textContent = `${i.toString()} : ${cars[i]}`;

                listItem.appendChild(listText);
                this.carList.appendChild(listItem);
            }
        }
    }

    showRecent(cars) {
        if (!cars.recent.length) {return;} //if we don't have any recent cars
        this.recentList.textContent = ''; //delete all child nodes

        console.log(cars.recent)

        for (let index in cars.recent) {
            let regn = cars.recent[index];
            let position = cars.lots.indexOf(regn);

            const listItem = document.createElement('li');
            listItem.classList.add("list-group-item", "col-10", "col-lg-3", "border", "border-dark", "border-opacity-25", "rounded-pill", "border-2", "mx-4", "my-2");
            const listText = document.createElement('span');

            listText.textContent = `${regn} parked at lot ${position}`;
            listItem.appendChild(listText);
            this.recentList.appendChild(listItem);

        }
    }
}