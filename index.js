const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
require('dotenv').config();

// function promptUser() {
    inquirer.prompt([
        
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username."
      },
      {
        type: "input",
        name: "title",
        message: "Please provide a title for this readMe document?"
      },
      {
        type: "input",
        name: "description",
        message: "Please provide a description for this readMe document?"
      }, 
      
      {
        type: "input",
        name: "installation",
        message: "Please provide a description for how your app is installed?"
      },         
      {
        type: "input",
        name: "usage",
        message: "Please provide a description for how your app is used?"
      }, 
      {
        type: "input",
        name: "license",
        message: "Please provide your license information."
      },  
      {
        type: "input",
        name: "contribution",
        message: "Please provide contribution information."
      },       
      {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL."
      }
    ])
    .then(function(info) {
      let gitHubUserName = info.github
      let title = info.title;
      let description = info.description;
      let installation = info.installation;
      let usage = info.usage;
      let license = info.license;
      let contribution = info.contribution;
      let linkedinUserName = info.linkedin
     
 

      const queryUrl = `https://api.github.com/users/${gitHubUserName}?client_id=115d68ff1497acbd665d&client_secret=aa009bdc3302e0edf821d60cd61be28008578e73`;
      axios.get(queryUrl).then(function(resp){  
       let email = resp.data.email
       let badge = `![license](https://img.shields.io/badge/license-${license}-Blue.svg)`
      //  (https://shields.io/licenses/${license})`
       let avatar = `![avatar](${resp.data.avatar_url} "avatar")`;
       
        let markDown = ` ${avatar} \n\n# *Your Project Title:*\n ${title}  \n\n# Description: \n\n ${description}  \n\n\n\n\n## Table of Contents: \n    *Installation \n    *Usage \n    *License \n    *Contribution \n\n## Installation: \n\n## Usage: \n${usage}  \n\n## License: \n${license} \n\n## Contribution: \n ${contribution} \n\n\n## LinkedIn URL: \n  ${linkedinUserName} \n\n\n\n## Email Address: \n ${email} \n\n## Badge: ${badge}`

        fs.writeFile("mynewReadme.md",markDown, function(err){
          if (err) {
            console.log(error);}
            else {
              console.log("write operation complete")
          }
        })
      })

    })
    

