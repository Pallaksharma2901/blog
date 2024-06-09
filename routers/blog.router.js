const {Router} = require("express");
const { home, addUpdateBlog, uploadImg, getBlog, deleteBlog, logIn, signUp, logout, logInPage, signUpPage } = require('../controllers/blog.controllers');
const {userAuth} = require('../middleware/userAuth');

const router = Router();

router.get('/login', logInPage);
router.get('/signup', signUpPage);
router.get('/',userAuth,home);
router.get('/addUpdateBlog',getBlog);
router.get('/deleteBlog',deleteBlog);
router.get('/logout', logout);
router.post("/addUpdateBlog", uploadImg, addUpdateBlog);
router.post('/signup',signUp);
router.post("/login",logIn);


module.exports = router;
