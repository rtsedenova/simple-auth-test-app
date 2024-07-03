const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee } = require('../controllers/controller');

router.get('/getemployees', getAllEmployees);
router.post('/addemployee', createEmployee);

module.exports = router;
