var express = require('express');
var router = express.Router();
const Blogapi=require('../controller/blog')
var multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/blog')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix +file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/allblog',Blogapi.allBlog);


router.post('/addblog',upload.array('image', 5),Blogapi.addBlog);



router.delete('/deleteblog/:id',Blogapi.delBlog);


router.patch('/updateblog/:id',upload.array('image',5),Blogapi.updBlog);


router.get('/searchblog',Blogapi.searchblog);


router.get('/page1',Blogapi.page1)

router.get('/page2',Blogapi.page2)



module.exports = router;



