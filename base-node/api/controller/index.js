const Models = require('../model/index')

exports.addItem  = async(req , res , next) => {
    try {
        await Models.create({name : req.body.name})
        res.send({})
    } catch (error) {
        res.send({error : error});
    }
}

exports.deleteItem  = async(req , res , next) => {
    try {
        await Models.findByIdAndDelete(req.params.id )
        res.send({})
    } catch (error) {
        res.send({error : error});
    }
}

exports.updateItem  = async(req , res , next) => {
    try {
        await Models.findByIdAndUpdate(req.params.id ,{name : req.body.name})
        res.send({})
    } catch (error) {
        res.send({error : error});
    }
}

exports.paginateItem  = async(req , res , next) => {
    try {
        const limit = parseInt(req.query.limit)
        const activePage =  parseInt(req.query.activePage)
        const skip = (activePage - 1)*limit
        const totalRecord = await Models.countDocuments({})
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({}).skip(skip).limit(limit)
        res.send({listData , totalPage })
    } catch (error) {
        res.send({error : error});
    }
}

exports.searchItem  = async(req , res , next) => {
    try {
        const name = req.query.textSearch
        const limit = parseInt(req.query.limit)
        const activePage =  parseInt(req.query.activePage)
        const skip = (activePage - 1)*limit
        const totalRecord = await Models.countDocuments({name : {$regex : name , $options : 'i'}})
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({name : {$regex : name , $options : 'i'}}).skip(skip).limit(limit)
        res.send({listData , totalPage })
    } catch (error) {
        res.send({error : error});
    }
}