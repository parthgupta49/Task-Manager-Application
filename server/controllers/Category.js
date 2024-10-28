const Category = require('../models/Category');

exports.createCategory = async(req,res) => {
    try {

        const name = req.body?.name;
        if (!name){
            return res.status(400).json({success : false,message: 'Category name is required'});
        }
        const category = await Category.create({name});
        if (!category){
            return res.status(400).json({success : false,message: 'Failed to create category'});
        }
        res.status(201).json({success : true,message: 'Category created successfully', category});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false,message: 'Failed to create category'});
    }
}