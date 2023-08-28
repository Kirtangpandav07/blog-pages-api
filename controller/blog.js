const BLOG = require("../model/blog")




exports.allBlog = async function (req, res, next) {
    try {
        const data = await BLOG.find().populate('category')
        res.status(200).json({
            status: "success",
            message: "all blog found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.addBlog = async function (req, res, next) {

    try {
        req.body.image = []
        const file = req.files

        file.map((el) => {
            console.log(el.filename);
            req.body.image.push(el.filename)
        })


        // req.body.image = req.files.filename
        // res.send(req.body.image)
        if (req.body.title || req.body.description || req.body.image || req.body.category) {
            // throw new Error("please enter valid fields")
        }
        console.log(req.body);

        const data = await BLOG.create(req.body)
        console.log(req.body);

        res.status(201).json({
            status: "success",
            message: "new blog created",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.delBlog = async function (req, res, next) {
    try {
        await BLOG.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "success",
            message: "user blog deleted",

        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.updBlog = async function (req, res, next) {
    try {
        const getdata = await BLOG.findById(req.params.id)
        const data = { ...getdata._doc, ...req.body }

        if (req.files) {
            data.image = []
            const file = req.files

            file.map((el) => {
                console.log(el.filename);
                data.image.push(el.filename)
            })
        }



        await BLOG.findByIdAndUpdate(req.params.id, data)
        res.status(201).json({
            status: "success",
            message: "user blog updated",

        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.searchblog = async function (req, res, next) {
    try {
        const search = await BLOG.find({ title: { $eq: req.query.title } }).populate("category")
        res.status(200).json({
            status: "sucess",
            message: "search is succesfully",
            data: search
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.page1 = async function (req, res, next) {
    try {
        const page1 =  await BLOG.find().skip(0).limit(5)
        res.status(200).json({
            status: "sucess",
            message: "page1 is search",
            data: page1
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.page2 = async function (req, res, next) {
    try {
        const page2 =  await BLOG.find().skip(5).limit(5)
        res.status(200).json({
            status: "sucess",
            message: "page1 is search",
            data: page2
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

