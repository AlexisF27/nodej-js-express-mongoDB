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
  
  const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));
  if(!employee){
    return response.status(400).json({ "message": `Employee ID ${request.body.id} not found`});
  }
  if(request.body.name) employee.name = request.body.name;
  if(request.body.age) employee.age = request.body.age;
  if(request.body.city) employee.city = request.body.city;
  if(request.body.isStudent) employee.isStudent = request.body.isStudent;

  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
  const unsortedArray = [...filteredArray, employee]
  data.setEmployee(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  response.json(data.employees);
  
  
  response.json({
  })
};

const deleteEmplyee = (request, response) => {
  const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));
  if(!employee){
    return response.status(400).json({ "message": `Employee ID ${request.body.id} not found`});
  }
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
  data.setEmployee([...filteredArray]);
  response.json(data.employees);
};

const getEmployee = (request, response) => {
  const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));
  if(!employee){
    return response.status(400).json({ "message": `Employee ID ${request.body.id} not found`});
  }
  response.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmplyee,
  getEmployee
};