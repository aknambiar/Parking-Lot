//----
//  This class handles the parking and unparking of vehicles as well as
//  keep track of the most recent vehicles in the parking lot.
//----

export default class ParkingLot {
    constructor() {
        this.recent = new Array();
        this.lots = new Array(10);
    }

    UpdateRecents(slot) {
        if (this.recent.length >= 3) {
            this.recent.shift();
        }
        this.recent.push(slot);
    }

    parkVehicle(regn) {
        let slot = this.findSlot();

        if (slot) {
            this.lots[slot] = regn;
            this.UpdateRecents(regn);
            return slot;
        }
        return false;

    }

    unparkVehicle(regn) {
        let slot = this.findSlot(regn);

        if (slot) {
            this.lots[slot] = undefined;
            return slot;
        }
        return false

    }

    findSlot(regn = null) {
        if (regn) {
            //If we want to find a particular vehicle using registration number
            if (this.lots.indexOf(regn) == -1) {
                return false;
            }
            return this.lots.indexOf(regn);

        }
        else {
            //Find an empty slot for a vehicle
            for (var i = 1; i <= this.lots.length; i++) {
                if (this.lots[i] == undefined) {
                    return i;
                }
            }
            return false;

        }
    }

    getData() {
        return {
            recent: this.recent, 
            lots: this.lots
        }
    }

    setData(data) {
        this.recent = data.recent;
        this.lots = data.lots;
    }
}