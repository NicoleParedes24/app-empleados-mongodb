const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleados.controller');

router.route('/')
  .get(empleadoCtrl.getEmpleados)
  .post(empleadoCtrl.createEmpleado);

router.route('/:id')
  .get(empleadoCtrl.getEmpleado)
  .put(empleadoCtrl.editEmpleado)
  .delete(empleadoCtrl.deleteEmpleado);

module.exports = router;
