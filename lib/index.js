const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const htmlGenerator = require("../util/htmlGenerator");

let teammates = []; 

// chosing function 
const addingEmployee = 
[
    {
        type: 'list',
        message: 'Job of the person you want to add',
        name: 'title',
        choices: ['Engineer', 'Intern', 'Done']
    }
]

function chosingJobTitle()
 {
    inquirer.prompt(addingEmployee).then((ans) => 
    {
        if(ans.title === 'Engineer') 
        {
            getEngineer(ans.title); 
        } 
        else if (ans.title === 'Intern') 
        {
            getIntern(ans.title);
        } 
        else if (ans.title === 'Done') 
        {
            return generatefile();
        }
    })
}

// Manager prompt 
const ansManager = 
[
    { 
        type: 'input',
        message: "What is the Manager's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter their ID.',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Insert their Email.',
        name: 'email',
        validate: function (email) 
        {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) 
            {
                console.log(" confirmed");
                return true;
            } 
            else 
            {
                console.log(" please Enter Valid email");
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'What office are they in?',
        name: 'officeNumber'
    }
]

async function getManager ()
 {
    await inquirer.prompt(ansManager).then((ans)=> 
    {
        const employee = new Manager
        (
            ans.name,
            ans.id,
            ans.email,
            ans.officeNumber
        );
        teammates.push(employee)
        chosingJobTitle();
    });
    
}

// Engineer prompt
const ansEngineer = 
[
    { 
        type: 'input',
        message: "What is the Engineer's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter their ID.',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter their Email.',
        name: 'email',
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) 
            {
                console.log(" confirmed");
                return true;
            } 
            else 
            {
                console.log(" please Enter Valid email");
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Enter their Github.',
        name: 'github'
    }
]

async function getEngineer () 
{
    await inquirer.prompt(ansEngineer).then((ans) => 
    {
        const employee = new Engineer
        (
            ans.name,
            ans.id,
            ans.email,
            ans.github
        );
        teammates.push(employee)
        chosingJobTitle();
    })
}

// Intern prompt
const ansIntern = 
[
    { 
        type: 'input',
        message: "What is the Intern's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter their ID.',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter their Email.',
        name: 'email',
        validate: function (email) 
        {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) 
            {
                console.log(" confirmed");
                return true;
            } 
            else 
            {
                console.log(" please Enter Valid email");
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'What school does the intern attend?',
        name: 'school'
    }
]

async function getIntern () 
{
    await inquirer.prompt(ansIntern).then((ans) =>
     {
        const employee = new Intern
        (
            ans.name,
            ans.id,
            ans.email,
            ans.school
        );
        teammates.push(employee)
        chosingJobTitle();
    })
}

// starter
const init = async () => 
{
    try 
    {
        await getManager();
    } 
    catch(err) 
    {
        console.log(err)
    }
}

function generatefile() 
{
    fs.writeFile("team.html", htmlGenerator(teammates), (err) => 
    err ? console.error(err) : console.log('saved!'))
}

// init program
init();