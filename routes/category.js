var express = require('express');
var router = express.Router();

var multer = require('multer');

const Alllcategory=require('../controller/category')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix +file.originalname)
  }
})

const upload = multer({ storage: storage })



/* GET users listing. */
router.get('/allcategory',Alllcategory.cheakToken,Alllcategory.Allcategory);



router.post('/addcategory',upload.single('mainImg'),Alllcategory.Addcategory);



router.delete('/deletecategory/:id',Alllcategory.Deletecategory);



router.patch('/updatecategory/:id',Alllcategory.Updatecategory);








module.exports = router;
