//A big thank you/credit to https://github.com/nicolewallace09/team-profile-generator - Studied this closely to recreate functionality here. Great examples of intertwining OOP and node.js dependencies.


const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./js/makeHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const teamMembers = [] //an array to store team members for now.


function managerPrompt (){
    return inquirer.prompt([
        {
          type: 'input',
          message: 'Who is the manager of this team?',
          name: 'managerName',
          validate: filledName => {
            if(filledName){

                return true
            }
            else{
                console.log("Please enter a name!")
                return false

            }
          }},
        {
          type: 'input',
          message: 'Please enter the managers ID number',
          name: 'managerID',
          validate: numInput =>{
            if(isNaN(numInput)){
                console.log("Please enter a valid ID number!")
                return false
            }
            else{
                return true

            }

          }
        },
        {
          type: 'input',
          message: 'Please input the managers email',
          name: 'managerEmail',
          validate: validEmail => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validEmail)    //taken from a Stackoverflow post
            
            if(valid){
                console.log("Email accepted")
                return true

            }
            else{
                console.log("Please enter a valid email!")
                return false

            }

          }

        },
        {
            type: 'input',
            message: 'Please input the managers office number',
            name: 'managerOffice',
            validate: officeNumber => {
                if(isNaN(officeNumber)){
                    console.log("Please enter a valid office number")
                    return false

                }
                else{
                    return true

                }

            }
          },
        ])
        .then(managerInput => {
            const  { managerName, managerID, managerEmail, managerOffice } = managerInput; 
            const manager = new Manager (managerName, managerID, managerEmail, managerOffice);
    
            teamMembers.push(manager); 
            console.log(manager); 
        })
    };    
    
    
    


        function employeePrompt (){
            return inquirer.prompt([

                {
                    type: 'list',
                    message: 'Is this an engineer or an intern?',
                    name: 'jobRank',
                    choices: ["Engineer", "Intern"]
                    },
                {
                  type: 'input',
                  message: 'What is this employees name?',
                  name: 'employeeName',
                  validate: filledName => {
                    if(filledName){
        
                        return true
                    }
                    else{
                        console.log("Please enter a name!")
                        return false
        
                    }
                  }},
                {
                  type: 'input',
                  message: 'Please input the employees email',
                  name: 'employeeEmail',
                  validate: validEmail => {
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(validEmail)   
                    
                    if(valid){
                        console.log("Email accepted")
                        return true
        
                    }
                    else{
                        console.log("Please enter a valid email!")
                        return false
        
                    }
        
                  }
        
                },

                {
                    type: 'input',
                    name: 'employeeID',
                    message: "Please enter the employee's ID.",
                    validate: nameInput => {
                        if  (isNaN(nameInput)) {
                            console.log ("Please enter the employee's ID!")
                            return false; 
                        } else {
                            return true;
                        }
                    }
                },

                {
                    type: 'input',
                    name: 'github',
                    message: "Please enter the engineer's github username.",
                    when: (input) => input.jobRank === "Engineer",
                    validate: nameInput => {
                        if (nameInput ) {
                            return true;
                        } else {
                            console.log ("Please enter the engineer's github username!")
                        }
                    }
                },

                {
                    type: 'input',
                    name: 'school',
                    message: "Please enter the intern's school",
                    when: (input) => input.jobRank === "Intern",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log ("Please enter the intern's school!")
                        }
                    }
                },

                {
                    type: 'confirm',
                    name: 'addAnother',
                    message: 'Add another team member?',
                    default: false
                }

                ])
            
            
                .then(employeeData => {
                    // data for employee types 
            
                    let { employeeName, employeeID, employeeEmail, jobRank, github, school, addAnother } = employeeData; 
                    let employee; 
            
                    if (jobRank === "Engineer") {
                        employee = new Engineer (employeeName, employeeID, employeeEmail, github);
            
                        console.log(employee);
            
                    } else if (jobRank === "Intern") {
                        employee = new Intern (employeeName, employeeID, employeeEmail, school);
            
                        console.log(employee);
                    }
            
                    teamMembers.push(employee); 
            
                    if (addAnother) {
                        return employeePrompt(teamMembers); 
                    } else {
                        return teamMembers;
                    }
                })            
            
            
            
            }
            
            const writeFile = data => {
                fs.writeFile('../sample/index.html', data, err => {
                    // if there is an error 
                    if (err) {
                        console.log(err);
                        return;
                    // when the profile has been created 
                    } else {
                        console.log("Your team profile has been successfully created! Please check out the index.html")
                    }
                })
            }; 

            managerPrompt()
            .then(employeePrompt)
            .then(teamMembers => {
              return generateHTML(teamMembers);
            })
            .then(pageHTML => {
              return writeFile(pageHTML);
            })
            .catch(err => {
           console.log(err);
            }); 