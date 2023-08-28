INSERT INTO department (id, department_name)
    VALUES (001, "Client Services"),
            (002, "Sales"),
            (003, "Marketing"),
            (004, "IT");



INSERT INTO role (id, title, salary, department_id)
    VALUES(001, "Software Engineer", 80000, 004),
            (002, "Communications Coordinator", 65000, 003),
            (003, "Sales Associate", 70000, 002);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES ("John", "Doe", 001, 1234),
            ("Olivia", "Pope", 002, 3456),
            ("Meredith", "Grey", 003, 1236);
            