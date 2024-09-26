
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
const customers = require('../controllers/controller.js');
const usuarios = require('../controllers/usuarios.js');
const proyectos = require('../controllers/proyectos.js');
const tareas = require('../controllers/tareas.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);


router.post('/api/proyectos/create', proyectos.create);
router.get('/api/proyectos/all', proyectos.retrieveAllProyectos);
router.put('/api/proyectos/update/:id', proyectos.updateById);
router.delete('/api/proyectos/delete/:id', proyectos.deleteById);


router.post('/api/tareas/create', tareas.create);
router.get('/api/tareas/all', tareas.retrieveAllTareas);
router.put('/api/tareas/update/:id', tareas.updateById);
router.delete('/api/tareas/delete/:id', tareas.deleteById);


module.exports = router;

