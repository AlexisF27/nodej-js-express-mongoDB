const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeeController')



router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmplyee);

router.route('/:id')
    .get(employeesController.getEmployee);


module.exports = router;
