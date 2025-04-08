const express = require('express');
const router = express.Router();
const EmployeeModel = require("./models/employees")



router.get('/employees' ,(req , res) =>{
    EmployeeModel.find().then((employees) =>{
        res.send(employees)
    }).catch((err)=>{
        res.status(500).send({message : err.message})

    });
})


router.post('/employee',async (req, res) =>{
   const employeeData = req.body

   try {
    const employee = new EmployeeModel(employeeData)
    const newEmployee = await employee.save()
    res.status(201).json(newEmployee);

   }catch(error) {
    res.status(500).json({message :'Server Error'

    })
   }
   
});



router.get('/employee/:id', async(req , res) =>{
   try{
    const employee = await EmployeeModel.findById(req.params.id);
    if (!employee){
        return res.status(404).json({message : 'Employee not found'})
    }
    res.status(200).json(employee);
   }catch(error){
    res.status(500).json({message : ' Server Error'})
   }
})

router.put('/employee/:id', async (req, res) => {
    try {
      const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.delete('/employee/:id', async (req, res) => {
    const { id } = req.params; 
  
    try {
      const employee = await EmployeeModel.findByIdAndDelete(id);
      
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      
      res.status(204).json({message : "Employee deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
});
  
  




module.exports = router;
