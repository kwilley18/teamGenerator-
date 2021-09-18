const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []; 

function addTeamMember(){

    inquirer.prompt([
        {
            type: 'input', 
            message:"Enter team members name", 
            name:'name'
        },
        {
            type: 'input', 
            message:"Enter team members id", 
            name:'id', 
        },
        {
            type: 'list', 
            message:"Enter team members role", 
            choices: [
                "Engineer",
                "Intern", 
                "Manager"
            ],
            name:'role', 
        },
        {
            type: 'input', 
            message:"Enter team members email", 
            name:'email', 
        }
    ])

    
    .then( ({name, role, id, email}) => {

        let roleInfo = ""; 

        if( role === "Intern" ){
            roleInfo = "school name";
        }
        else if( role === "Engineer" ){
          
            roleInfo = "GitHub username";
        }
        else{
            roleInfo = "office phone number";
        }
        inquirer.prompt([
            {
                message: `Enter team member's ${roleInfo}`, 
                name: "roleInfo"
            },
            {
                message: "Add more members?", 
                choices: [
                    "yes",
                    "no"
                ], 
                name: "addMoreMembers"

            } 
        ])
        .then( 
            ({roleInfo, addMoreMembers}) => {
                let newMember; 
                if(role === "Engineer"){
                    newMember = new Engineer(name, id, email, roleInfo); 
                    //console.log(newMember); 
                    //console.log(newMember.getRole()); 

                }
                else if(role === "Intern"){
                    newMember = new Intern(name, id, email, roleInfo); 
                }
                else{
                    newMember = new Manager(name, id, email, roleInfo); 
                }

                teamMembers.push(newMember); 

                addToHTML(newMember); 
                
                if(addMoreMembers === "yes"){
                    addTeamMember();     
                }
                else if(addMoreMembers === "no"){
                    finishHTML(); 
                }
        }); 


    }); 


}


function addToHTML(teamMember){
    if(teamMember.getRole() === "Engineer"){
 
       fs.writeFileSync('./index.html', render(teamMembers)); 
    }
    else if(teamMember.getRole() === "Intern"){
        fs.writeFileSync('./index.html', render(teamMembers)); 

    }
    else if(teamMember.getRole() === "Manager"){
        fs.writeFileSync('./index.html', render(teamMembers))
    }

}
function finishHTML(){
 console.log("HTML has been created"); 
}

addTeamMember(); 

  

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


// function buildTeam
