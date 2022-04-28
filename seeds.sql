 USE employee_db

INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Account Managment"),
       ("Sales"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Front End Dev", 102000.00, 1),
       ("Back End Dev", 150000.00, 1),
       ("Lawyer", 95000.00, 5),
       ("Sales Account Manager", 55000.00, 3),
       ("Data Analytics", 75000, 2),
       ("Sales Rep", 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Stein", 1, NULL),
       ("Michael", "Barrientos", 2, 1),
       ("Fernando", "Alvarez", 4, NULL), 
       ("Ethan", "Shelly", 3, NULL), 
       ("Daniel", "Half", 4, 1),
       ("Greg", "Human", 4, 2),
       ("Brianna", "Merales", 5, NULL);
       