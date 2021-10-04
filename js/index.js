const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
// const generateMarkdown = require('.js/index.js');
const writeFileAsync = util.promisify(fs.writeFile);

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
            const  { name, id, email, officeNumber } = managerInput; 
            const manager = new Manager (name, id, email, officeNumber);
    
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
                    when: (input) => input.role === "Engineer",
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
                    when: (input) => input.role === "Intern",
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

                ])}
            
    

        async function init() {

            var manager = await managerPrompt()
            var employee = await employeePrompt()
            console.log()
        
        }


     init()   