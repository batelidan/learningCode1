const mongoose = require('mongoose');
const User = require('./schema'); // Replace with the correct path to your schema
require('dotenv').config();
const { env } = require("process");

const data = [
    {
      key: 1,
      title: "Add-Numbers",
      correctCode: `
        function addNumbers(a, b) {
          return a + b;
        }
        
        const result = addNumbers(5, 7);
        console.log("Result:", result); 
      `,
      incorrectCode: `
        function addNumbers(a, b) {
          return a - b; ;
        }
        
        const result = addNumbers(5, 7);
        console.log("Result:", result); 
      `
    },
    {
      key: 2,
      title: "Multiply-Numbers",
      correctCode: `
        function multiplyNumbers(a, b) {
          return a * b;
        }
        
        const result = multiplyNumbers(3, 4);
        console.log("Result:", result); 
      `,
      incorrectCode: `
        function multiplyNumbers(a, b) {
          return a + b; // Incorrect: should be a * b;
        }
        
        const result = multiplyNumbers(3, 4);
        console.log("Result:", result); 
      `
    },
    {
      key: 3,
      title: "String-Concatenation",
      correctCode: `
        const firstName = "John";
        const lastName = "Doe";
        const fullName = firstName + " " + lastName;
        console.log("Full Name:", fullName); 
      `,
      incorrectCode: `
        const firstName = "John";
        const lastName = "Doe";
        const fullName = firstName - lastName; 
        console.log("Full Name:", fullName);
      `
    },
    {
      key: 4,
      title: "Array-Sum",
      correctCode: `
        const numbers = [1, 2, 3, 4, 5];
        const sum = numbers.reduce((total, num) => total + num, 0);
        console.log("Sum:", sum); 
      `,
      incorrectCode: `
        const numbers = [1, 2, 3, 4, 5];
        const sum = numbers.map(num => num + 1).reduce((total, num) => total + num, 0); // Incorrect: unnecessary map operation
        console.log("Sum:", sum); 
      `
    }
  ];

async function uploadData() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const item of data) {
      await User.create(item);
      console.log(`Uploaded data for ${item.title}`);
    }

    console.log('Data upload completed.');
  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    mongoose.disconnect();
  }
}

uploadData();
