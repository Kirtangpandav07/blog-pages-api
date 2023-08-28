const CATEGORY = require("../model/category")
var jwt = require('jsonwebtoken');


exports.cheakToken=async function(req,res,next){
  try {
    let token=req.headers.authorization
    if (!token) {
      throw new Error("pleace attech token")
    }
    let decode=jwt.verify(token,"THIS-IS-QUIZE-GAME")
    
    let cheakCategory=await CATEGORY.findById(decode.id)
    if (!cheakCategory) {
      throw new Error("user not found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      status:"fail",
      message:error.message,
    })
  }
}


exports.Allcategory=async function(req, res, next) {
    try {
      const data = await CATEGORY.find()
      res.status(200).json({
        status: "success",
        message: "all category found",
        data:data
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  }

  exports.Addcategory=async function(req, res, next) {
    try {
      
      req.body.mainImg = req.file.filename
      if (!req.body.name ||!req.body.mainImg) {
        throw new Error("please enter valid fields")
      }
      const data = await CATEGORY.create(req.body)
      let token=jwt.sign({id:data._id},"THIS-IS-QUIZE-GAME")
      res.status(201).json({
        status: "success",
        message: "new category created",
        data:data,
        token
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  }

  exports.Deletecategory=async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status: "success",
        message: "user deleted",
        
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  }

  exports.Updatecategory=async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
      res.status(201).json({
        status: "success",
        message: "user updated",
        
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  }