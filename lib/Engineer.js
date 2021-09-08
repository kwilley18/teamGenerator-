// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js"); 

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email); // calls Empolyee 
        this.github = github; 
        //this.role = role; 
    }
    getGithub(){
        return this.github; 
    }
    getRole(){
        return "Engineer"; 
    }
}

module.exports = Engineer; 