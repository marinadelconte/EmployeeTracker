import inquirer from "inquirer";
import mysql from "mysql2";

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

async function showRoles() {
    let result = await db.promise().query("SELECT * FROM ROLE;");
    console.table(result[0]);
    init();
}

async function showEmployees() {
    let result = await db.promise().query("SELECT * FROM EMPLOYEE;");
    console.table(result[0]);
    init();
}

async function addDepartment() {
    let result = await db.promise().query("SELECT * FROM DEPARTMENT;");
    let newDepartment = result[0].map(({ id, department_name }) => ({ name: department_name, value: id }))
    let action = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter the name of the department you would like to add.',
            },
        ])


    let response = await db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [action.roleTitle, action.roleSalary, action.roleDepartment])
    console.log(response)
    init();
}

async function addRole() {
    let result = await db.promise().query("SELECT * FROM DEPARTMENT;");
    let departmentChoices = result[0].map(({ id, department_name }) => ({ name: department_name, value: id }))
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
                message: 'What department would you like to add?',
                choices: departmentChoices
            },
        ])


    let response = await db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [action.roleTitle, action.roleSalary, action.roleDepartment])
    console.log(response)
    init();
}

async function addEmployee() {
    let result = await db.promise().query("SELECT * FROM EMPLOYEE;");
    let managerChoices = result[0].map(({first_name, last_name, role_id}) => ({ name: first_name, last_name, value: role_id}))
    let action = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee first name?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee last name?',
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is their role?',
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is their manager?',
                choices: managerChoices
            },
        ])


    let response = await db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [action.firstName, action.lastName, action.role, action.manager])
    console.log(response)
    init();
}

async function updateRole() {
    let result = await db.promise().query("SELECT * FROM EMPLOYEE;");
    let employeeChoices = result[0].map(({ first_name, last_name, role_id, manager_id }) => ({ name: first_name, last_name, role_id, manager_id}))
    let action = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'employees',
                message: 'Which employee would you like to update?',
                choices: employeeChoices
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'What is their new role?',
            },
        ])


    let response = await db.promise().query("SET role (newRole) VALUES (?);", [action.newRole])
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
    if (action === "View all roles") {
        showRoles()
    }
    if (action === "View all employees") {
        showEmployees()
    }
    if (action === "Add a department") {
        addDepartment();
    }
    if (action === "Add a role") {
        addRole();
    }
    if (action === "Add an employee") {
        addEmployee();
    }
    if (action === "Update employee role") {
        updateRole();
    }
}

init();