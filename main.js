class ParkingLot {
    constructor() {
        this.recent = new Array(3);
        this.lots = new Array(10);
    }

    parkCar() {
        const regField = document.querySelector('#parkCarRegn');
        const result = document.querySelector('#parkResult');
        let Regn = regField.value;

        //Check if Registration No is valid
        if (this.validateRegn(Regn)) {
            regField.value = ""; //Reset input field

            try {
                //Check for available slot to replace
                let slot = this.findSlot();
                this.lots[slot] = Regn;
                result.textContent = "Parked at lot " + slot;

                //Add car to recent car array
                if (this.recent.length >= 3) {
                    this.recent.shift();
                }
                this.recent.push(slot);

            } catch (error) {
                result.textContent = error.message;
            }
        }
        else {
            result.textContent = "Invalid Registration Number.";
        }

        result.classList.remove('d-none');
        this.updateRecentCars();
        this.writeStorage()
    }

    unparkCar() {
        const regField = document.querySelector('#unparkCarRegn');
        const result = document.querySelector('#unparkResult');
        let Regn = regField.value;
        
        if (this.validateRegn(Regn)) {
            try {
                let position = this.findSlot(Regn);
                this.lots[position] = undefined;
                result.textContent = "Unparked from lot " + position;
            }
            catch (error) {
                result.textContent = error.message;
            }
        }
        else {
            result.textContent = "Invalid Registration Number.";
        }

        result.classList.remove('d-none');
        this.writeStorage()
    }

    validateRegn(Regn) {
        const re = new RegExp("[A-Za-z]{2}[0-9]{8}");
        return re.test(Regn);
    }

    getAllCars() {
        const listHead = document.querySelector('#listcars')
        listHead.removeChild(document.querySelector('#listcars ul'));
        const list = document.createElement('ul');
        list.classList.add('list-group');
        for (var i = 0; i < this.lots.length; i++) {
            if (this.lots[i] != undefined) {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                const listText = document.createElement('span');

                listText.textContent = `${i.toString()} : ${this.lots[i]}`;
                listItem.appendChild(listText);
                list.appendChild(listItem);
            }
        } 
        listHead.appendChild(list);
    }

    findSlot(Regn = null) {
        if (Regn) {
            if (this.lots.indexOf(Regn) == -1) {
                throw new Error("Car does not exist!");
            }
            return this.lots.indexOf(Regn);

        }
        else {
            for (var i = 0; i < this.lots.length; i++) {
                if (this.lots[i] == undefined) {
                    return i;
                }
            }
            throw new Error("No space left!");

        }
    }

    updateRecentCars() {
        const listHead = document.querySelector('#recent-list')
        listHead.removeChild(document.querySelector('.list-group-horizontal'));
        const list = document.createElement('ul');
        list.classList.add("list-group","list-group-horizontal");

        for (var i = this.recent.length -1; i >= 0; i--) {
            if (this.recent[i] != undefined){

                const listItem = document.createElement('li');
                listItem.classList.add("list-group-item","col-3","border","border-dark","border-opacity-25","rounded-pill","border-2","mx-4");
                const listText = document.createElement('span');

                listText.textContent = `${this.lots[this.recent[i]]} parked at lot ${this.recent[i]}`;
                listItem.appendChild(listText);
                list.appendChild(listItem);
            }
        }
        listHead.appendChild(list)
    }


    readStorage() {
        if (localStorage.getItem("recent")){
            this.recent = JSON.parse(localStorage.getItem("recent"));
        }
        if (localStorage.getItem("lots")){
            this.lots = JSON.parse(localStorage.getItem("lots"));
        }
        this.updateRecentCars();
    }

    writeStorage() {
        localStorage.setItem("recent", JSON.stringify(this.recent));
        localStorage.setItem("lots", JSON.stringify(this.lots));
    }
}

const parkinglot = new ParkingLot();
parkinglot.readStorage();


parkBtn = document.querySelector('#park button')
parkBtn.addEventListener('click', () => {
    parkinglot.parkCar();
})

parkBtn = document.querySelector('#unpark button')
parkBtn.addEventListener('click', () => {
    parkinglot.unparkCar();
})

listBtn = document.querySelector('[data-bs-target="#listcars"]')
listBtn.addEventListener('click', () => {
    parkinglot.getAllCars();
})