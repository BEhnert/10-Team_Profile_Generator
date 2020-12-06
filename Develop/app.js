const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


var team = [];

  async function manager() {
    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
        default: "Bob"
      },
      {
        type: "number",
        name: "id",
        message: "What is the manager's ID?",
        default: 1
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
        default: "hungry@gmail.com"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office phone?",
        default: "651-972-9999",
      }
    ]);
    var employee= new Manager(answers.name,answers.id,answers.email,answers.officeNumber)
    team.push(employee);
  };
  //Prompt to enter Engineer, Intern, or Finish to build team.html page
  //use functions?  check response to see if Engineer, Intern, or Finish

  //Engineer questions
  async function engineer() {
    var answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
        default: "Sally"
      },
      {
        type: "number",
        name: "id",
        message: "What is the engineer's ID?",
        default: 2
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
        default: "engineer@gmail.com"
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's Github username?",
        default: "Sally",
      }
    ]);
    var employee= new Engineer(answers.name,answers.id,answers.email,answers.github)
    team.push(employee);
  };

  //Intern questions
  async function intern() {
    let answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        default: "Jeff"
      },
      {
        type: "number",
        name: "id",
        message: "What is the intern's ID?",
        default: 3
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
        default: "intern@gmail.com"
      },
      {
        type: "input",
        name: "school",
        message: "Where did the intern attend school?",
        default: "UMN-Bootcamp",
      }
    ]);
    var employee= new Intern(answers.name,answers.id,answers.email,answers.school)
    team.push(employee);
  };

  const teamAdd = async()=>{
    let answers = await inquirer.prompt(
      {
        type: "list",
        name: "role",
        message: "Choose type of employee to add",
        choices: ["Engineer","Intern"]
      }
    )
    if (answers.role==="Engineer"){
      await engineer();
      shouldWeAddAnother();
    }
    else if (answers.role==="Intern"){
      await intern();
      shouldWeAddAnother();
    }
  }

  const shouldWeAddAnother = async()=>{
    let answers = await inquirer.prompt(
      {
        type: "list",
        name: "role",
        message: "Would you like to add another",
        choices: ["Yes","No"]
      }
    )
    if (answers.role==="Yes"){
      teamAdd();
    }
    else if (answers.role==="No"){
      finish();
    }
    else {
    console.log("Finish")
    }
  }
  
  const buildTeam = async()=>{
    await manager();
    teamAdd();
  }

  const finish = async()=>{

    fs.writeFileSync(outputPath, render(team),"utf-8") 
  }

  buildTeam();

  
  