// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return 'Employee';
  }
  // printInfo() {
  //   console.log(`This vehicle has ${this.numberOfWheels} wheels`);
  //   console.log(`This vehicle has an id of ${this.id}`);
  // }
}
module.exports = Employee;
