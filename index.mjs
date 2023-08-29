import inquirer from "inquirer";
import fs from "fs/promises";
import mysql from "mysql2";
import { log } from "console";

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

async function showDepartments() {
    let result = await db.promise().query("SELECT * FROM DEPARTMENT;");
    console.table(result[0]);
    init();
}

async function addRole() {
    let result = await db.promise().query("SELECT * FROM DEPARTMENT;");
    let departmentChoices = result[0].map(({id, department_name}) => ({name: department_name, value: id}))
    let action = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What role would you like to add?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary?',
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'What role would you like to add?',
                choices: departmentChoices
            },
        ])


    let response = await db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [action.roleTitle, action.roleSalary, action.roleDepartment])
    console.log(response)
    init();
}

async function init() {

    let { action } = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', "Add an employee", 'Update employee role'],
            },




        ])
    if (action === "View all departments") {
        showDepartments()
    }

    if (action === "Add a role") {
        addRole();
    }
}

init();