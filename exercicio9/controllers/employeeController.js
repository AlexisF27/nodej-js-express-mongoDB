const data = {
  employees: require('../model/employees.json'),
  setEmployee: function (data) { this.employees = data }
};




const getAllEmployees = (request, response) => {
  response.json(data.employees);
};

const createNewEmployee = (request, response) => {

  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    name: request.body.name,
    age: request.body.age,
    city: request.body.city,
    isStudent: request.body.isStudent
  }
  if (!newEmployee.name || !newEmployee.age) {
    return response.status(4).json({ 'message': 'Name and age is required' });
  }

  data.setEmployee([...data.employees, newEmployee]);


  response.json(data.employees);
};

const updateEmployee = (request, response) => {
  response.json({
    "name": request.body.name,
    "age": request.body.age,
    "city": request.body.city,
    "isStudent": request.body.isStudent
  })
};

const deleteEmplyee = (request, response) => {
  response.json({ "id": request.body.id })
};

const getEmployee = (request, response) => {
  response.json({ "id": request.params.id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmplyee,
  getEmployee
};