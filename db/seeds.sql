INSERT INTO department (department_name)
    VALUES ("Client Services"),
            ("Sales"),
            ("Marketing"),
            ("IT");



INSERT INTO role (title, salary, department_id)
    VALUES("Software Engineer", 80000, 4),
            ("Communications Coordinator", 65000, 3),
            ("Sales Associate", 70000, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("John", "Doe", 1, NULL),
            ("Olivia", "Pope", 2, 1),
            ("Meredith", "Grey", 3, 1);
            