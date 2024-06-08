const {Router} = require("express");
const{home,addUpdateBlog,uploadImg,getBlog,deleteBlog} = require('../controllers/blog.controllers');

const router = Router();

router.get('/',home);
router.get('/addUpdateBlog',getBlog);
router.get('/deleteBlog',deleteBlog);
router.post("/addUpdateBlog", uploadImg, addUpdateBlog);

module.exports = router;
