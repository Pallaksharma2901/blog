const userAuth = (req, res, next) => {
    let { USER } = req.cookies;
    if (USER) {
        next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = { userAuth };