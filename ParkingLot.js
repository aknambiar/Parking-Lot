//----
//  This class handles the parking and unparking of vehicles as well as
//  keep track of the most recent vehicles in the parking lot.
//----

export default class ParkingLot {
    static MAX_RECENT = 3;
    static MAX_LOTS = 10;
    constructor() {
        this.recent = new Array();
        this.lots = new Array(ParkingLot.MAX_LOTS);
    }

    updateRecent(slot) {
        if (this.recent.length >= ParkingLot.MAX_RECENT) {
            this.recent.shift();
        }
        this.recent.push(slot);
    }

    parkVehicle(regn) {
        let slot = this.findEmptySlot();

        if (slot) {
            this.lots[slot] = regn;
            this.updateRecent(regn);
        }
        return slot;
    }

    unparkVehicle(regn) {
        let slot = this.findOccupiedSlot(regn);

        if (slot) {
            this.lots[slot] = undefined;
        }
        return slot;
    }

    findEmptySlot(){
        for (var i = 1; i < this.lots.length; i++) {
            if (this.lots[i] == undefined) {
                return i;
            }
        }
        return false;
    }

    findOccupiedSlot(regn){
        if (this.lots.indexOf(regn) == -1) {
            return false;
        }
        return this.lots.indexOf(regn);
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
