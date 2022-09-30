const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
  return inquirer.prompt([
    
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },

        // Prompts user to add their github username.
      {
        type: 'input',
        name: 'github',
        message: 'What is your gitHub Username?',
        validate: githubUsername => {
          if (githubUsername) {
            return true;
          } else {
            console.log('Please enter your github username!');
            return false;
          }
        }
      },

        // Confirmation for an About Me section
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },

        // Provide some information about yourself section.
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself',
          when: ({ confirmAbout }) => confirmAbout
        }
    ]);
  };

  // promptUser().then(answers => console.log(answers));

  const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    console.log(`
    
    ========================
    
    Add New Project
    
    ========================
    
    `);

      // IF there is NO 'projects' Array property, create one
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    
      return inquirer.prompt([
          // Asks User for their project name
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',

            // Requires the user to add information or a prompt pops up 
          validate: projectName => {
            if (projectName) {
              return true;
            } else {
              console.log('Please enter the name of your project!');
              return false;
            }
          }
        },
        {
          // Asks user to describe their project
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: projectDescription => {
            if (projectDescription) {
              return true;
            } else {
              console.log('Please describe your project!');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build this project with? (Check all that apply)',
          choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the github link to your project. (Required)',
          validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('Please enter your github username!');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }

      ])

        .then(projectData => {
          portfolioData.projects.push(projectData);
          if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
          } else {
            return portfolioData;
          }
        });
      

    };

    // promptProject().then(answers => console.log(answers));

    promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });










// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
