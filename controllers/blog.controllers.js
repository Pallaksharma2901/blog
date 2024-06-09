const multer = require("multer");
const fs = require("fs");
const blog = require("../models/blog.schema");
const user = require("../models/user.schema");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const uploadImg = multer({ storage: storage }).single("image");

let blogId;

const home = async (req, res) => {
    try {
        let data = await blog.find();
        return res.render("index", { blogs: data })
    } catch (error) {
        console.log(error)
    }
}

const getBlog = async (req, res) => {
    let { id } = req.query;
    blogId = id
    if (id) {
        try {
            let data = await blog.findById(id);
            return res.render("Editblog", { data })
        } catch (error) {
            console.log(error)
        }
    } else {
        return res.render("Addblog")
    }

}

const deleteBlog = async (req, res) => {
    let { id } = req.query;
    try {
        await blog.findByIdAndDelete(id).then((singleRecode) => {
            fs.unlinkSync(singleRecode.image)
            return res.redirect("/");
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

const addUpdateBlog = async (req, res) => {
    if (blogId) {
        if (req.file) {
            blog.findById(blogId).then((singleRecode) => {
                fs.unlinkSync(singleRecode.image)
            }).catch((err) => {
                console.log(err);
            })

            let image = req.file.path

            try {
                let data = await blog.findByIdAndUpdate(blogId, { ...req.body, image })
                return res.redirect("/");
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                let data = await blog.findByIdAndUpdate(blogId, req.body)
                return res.redirect("/");
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        let image = req.file.path;

        console.log(image);
        try {
            let data = await blog.create({ ...req.body, image });
            return res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { home, getBlog, deleteBlog, addUpdateBlog, uploadImg }