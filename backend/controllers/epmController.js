const User = require("../models/employModel");
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");




// register user
exports.createEmp = catchAsyncErrors(async(req,res,next)=>{
    const { emp_id, name, age, department, status, location, longitude, latitude } =
      req.body;
    
    const user = await User.create({
      emp_id,
      name,

      age,
      department,
      status,
      location,
      longitude,
      latitude,
    });
   
  res.status(200).json({
    success: true,
    user,
  });
})




 exports.empDetails = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
 });




//update user -- -admin

exports.updateEmp = catchAsyncErrors(async(req, res,next)=>
{
   let user = await User.findById(req.params.id);
   if(!user){
      return  next(new ErrorHandler("User is not found with this Id", 500))
      
   }
   user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators:true,
      useUnified:false
   });
   res.status(200).json({
      success:true,
      user
   })

})

 //Get All User 

 exports.getAllEmp = catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  })
 })

// get single user details --admin

exports.getSingleEmp = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
     return next(new ErrorHandler("User is not Found by this Id", 404))
  }
     res.status(200).json({
        success:true,
        user,
     })

  
});

  

   //delete user --  admin

   
   exports.deleteEmp = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
  if(!user){
    return next(ErrorHandler(`User is not found ${req.params.id}`,400));
  }
  await user.remove();
  
    res.status(200).json({
      success:true,
      message:`user ${user.id} remove successfully `
    })
   })