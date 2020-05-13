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

//Use the [Inquirer npm package] to prompt the user for their email, id, and specific information based on 
//their role with the company. For instance, an intern may provide their school, whereas an engineer may 
//provide their GitHub username.


// render([manager, engineer, intern])

//     .fs.writeFile(outputPath, function (err) {

//             if (err) {
//                 return console.log(err);
//             }



//render([Manager, Engineer, Intern]);

//fs.writeFile(outputPath, function(err) {

//     if (err) {
//       return console.log(err);
//     }

//   });

const engagementTeam = [];
let inquiryCount = 0;


async function teamMember() {
    // Ask questions to gather information about manager. Save to an manager object.
    try {

        const manager = new Manager(
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is your manager's name?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is your manager's id?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "What is your manager's email?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is your manager's office number?",
                    name: "officeNumber"
                }
            ]))

        engagementTeam.push(manager)
        // Determine if an engineer or intern will be added next.

        async function chooseMemberNext() {
            try {
                do{
                let teamChoice = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'team',
                        message: 'Which type of team member would you like to add',
                        choices: ['Engineer', 'Intern', 'I don/t want to add anymore team members.']
                    }
                ]);



                
                // Depending on the response, loop through questions to gather information and save to appropriate object
                if (teamChoice.team === 'Engineer') {

                    let engineer = new Engineer(inquirer.prompt([
                        {
                            type: "input",
                            message: "What is your engineer's name?",
                            name: "e-name"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's id?",
                            name: "e-id"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's email?",
                            name: "e-email"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's GitHub username?",
                            name: "github"
                        }
                    ]));
                } else if (teamChoice.team === 'Intern') {
                    let intern = new Intern(inquirer.prompt([
                        {
                            type: "input",
                            message: "What is your intern's name?",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "What is your intern's id?",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "What is your intern's email?",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "What is your intern's school?",
                            name: "school"
                        }
                    ]));
                } else if(teamChoice.team === 'I don/t want to add anymore team members.') {
                    return false
                }
            } while(true)
            } catch (err) {
                console.log(err);
            }
        }
        chooseMemberNext()
        // Loop back to original question for engineer or intern and begin again until user calls "I don't want to add
        //anymore team members", at which point the loop stops

    } catch (err) {
        console.log(err);
    }

}


teamMember();

//Call the function



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
