const inquirer = require("inquirer");
const connection = require ("./connection")

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you want to do next?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add a Department", "Add a Role",
                "Add an Employee", "Update a Role", "Update Employee Role"
            ]
        }
    ]).then(answer => {
        if (answer.choice === "View All Employees") {
            viewAllEmployees();
        } else if (answer.choice === "View All Departments") {
            viewAllDepartments();
        } else if (answer.choice === "View All Roles") {
            viewAllRoles();
        } else if (answer.choice === "Add a Department") {
            addDepartment();
        } else if (answer.choice === "Add a Role") {
            addRole();
        } else if (answer.choice === "Add an Employee") {
            addEmployee();
        } else if (answer.choice === "Update a Role") {
            updateRole();
        } else if (answer.choice === "Update Employee Role") {
            updateEmployeeRole();
        }
    })
};

function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id; ",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
}

function viewAllDepartments() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
}

function viewAllRoles() {
    connection.query("SELECT roles.title, roles.salary, roles.department_id, department.name FROM roles LEFT JOIN department ON roles.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "Department"
        }
    ]).then(answer => {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.Department,
            },
            function (err, res) {
                console.log(res.affectedRows)
                mainMenu();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "Role"
        },
        {
            type: "input",
            message: "What is role salary?",
            name: "Salary"
        },
        {
            type: "input",
            message: "What department would be the department id?",
            name: "DepartmentId"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: answer.Role,
                salary: answer.Salary,
                department_id: answer.DepartmentId

            },
            function (err, res) {
                mainMenu();
            }
        );
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee first name?",
            name: "FirstName"
        },
        {
            type: "input",
            message: "What is the employees last name?",
            name: "LastName"
        },
        {
            type: "input",
            message: "What is the employee role id?",
            name: "RoleId"
        },
        {
            type: "input",
            message: "What is the employees manager id?",
            name: "ManagerId"
        }
    ]).then(answer => {
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.FirstName,
                last_name: answer.LastName,
                role_id: answer.RoleId,
                manager_id: answer.ManagerId
            },
            function (err, res) {
                console.log(res.affectedRows)
                mainMenu();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    })
}

function updateRole() {
    connection.query("SELECT * FROM roles",
        async function (err, res) {
            var choices = []
            let roles = await res
            if (err) throw err;
            for (let i = 0; i < roles.length; i++) {
                const role = roles[i];
                choices.push(role.title)
            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "What role would like to update?",
                    choices: choices,
                    name: "Role"
                },
                {
                    type: "input",
                    message: "What would you like to update this to?",
                    name: "NewRole"
                }
            ]).then(answer => {

                var query = connection.query(
                    "UPDATE roles SET ? WHERE ?",
                    [
                        {
                            title: answer.NewRole
                        },
                        {
                            title: answer.Role
                        }
                    ],
                    function (err, res) {
                        console.log(res.affectedRows + " Role updated!\n")
                        mainMenu();
                    }
                );
                console.log(answer)
            })

        });

}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee",
        async function (err, res) {
            var choices = []
            let employee = await res
            if (err) throw err;
            for (let i = 0; i < employee.length; i++) {
                const employees = employee[i];
                choices.push(employees.role_id)
            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee would like to update?",
                    choices: choices,
                    name: "RoleUpdate"
                },
                {
                    type: "input",
                    message: "What would you like to update this to?",
                    name: "NewEmployeeRole"
                }
            ]).then(answer => {

                var query = connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                        {
                            title: answer.NewEmployeeRole
                        },
                        {
                            title: answer.EmployeeRole
                        }
                    ],
                    function (err, res) {
                        console.log(res.affectedRows + " Employee role updated!\n")
                        // mainMenu();
                    }
                );
                console.log(answer)
            })

        });

}


mainMenu();