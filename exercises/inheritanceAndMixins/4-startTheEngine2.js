// Given the following code, modify startEngine in Truck by appending 'Drive fast, please!' to the return value of startEngine in Vehicle. The 'fast' in 'Drive fast, please!' should be the value of speed.

class Vehicle {
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  startEngine(speed) {
    return `${super.startEngine()} Drive ${speed}, please!`;
  }
}

let truck = new Truck();
console.log(truck.startEngine('fast'));

// Ready to go! Drive fast, please!