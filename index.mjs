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
    let result = await db.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    console.table(result[0]);
    init();
}

async function addDepartment() {
    let action = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'Enter the name of the department you would like to add.',
            },
        ])


    let response = await db.promise().query("INSERT INTO department (department_name) VALUES (?);", action.newDepartment)
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
    let managerChoices = result[0].map(({ first_name, last_name, role_id }) => ({ name: first_name, last_name, role_id }))
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
                message: 'What is their role by Id?',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is their manager by Id?',
            },
        ])


    let response = await db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [action.firstName, action.lastName, action.role, action.manager])
    console.log(response)
    init();
}

async function updateRole() {
    let result = await db.promise().query("SELECT * FROM EMPLOYEE;");
    let roleResults = await db.promise().query("SELECT * FROM ROLE");
    let roleChoices = roleResults[0].map(({ title, id }) => ({ name: title, value: id }))
    let employeeChoices = result[0].map(({ first_name, last_name, id }) => ({ name:`${first_name} ${last_name}`, value: id }))
    let action = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'employees',
                message: 'Which employee would you like to update?',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What is their new role?',
                choices: roleChoices
            },
        ])


    let response = await db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [action.newRole, action.employees])
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