const Store = require('../../Models/Store/Store.model')
const SubProduct = require('../../Models/Store/SubProduct.model')
const Cart = require('../../Models/Store/Cart.model')
const CartField = require('../../Models/Store/CartFields.model')


exports.postStore = async (req, res) => {
    try {
        // const hi = { Condation: true }
        await Store.create(req.body);
        res.status(200).json({ msg: 'sucess' })
    } catch (err) {
        console.log(err)
    }
}
exports.getStore = async (req, res) => {
    try {
        // const hi = { Condation: true }
        const store = await Store.find();
        res.status(200).json({ ...store })
    } catch (err) {
        console.log(err)
    }
}
exports.deleteStore = async (req, res) => {
    try {
        // const hi = { Condation: true }
        const store = await Store.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ ...store })
    } catch (err) {
        console.log(err)
    }
}
exports.postSubProduct = async (req, res) => {
    try {
        // const hi = { Condation: true }
        console.log(req.body)
        await SubProduct.create(req.body);
        res.status(200).json({ msg: 'sucess' })
    } catch (err) {
        console.log(err)
    }
}
exports.getSubProduct = async (req, res) => {
    try {
        // const hi = { Condation: true }
        const subProduct = await SubProduct.find();
        res.status(200).json({ ...subProduct })
    } catch (err) {
        console.log(err)
    }
}
exports.deleteSubProduct = async (req, res) => {
    try {
        // const hi = { Condation: true }
        const store = await SubProduct.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: 'sucess' })
    } catch (err) {
        console.log(err)
    }
}
exports.updateSubProduct = async (req, res) => {
    try {
        // const hi = { Condation: true }
        await SubProduct.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ msg: 'sucess' })
    } catch (err) {
        console.log(err)
    }
}
exports.postCart = async (req, res) => {
    try {
        // const hi = { Condation: true }
        const reqBody = req.body
        console.log(req.body)
        const name = {
            Fname: reqBody.Fname,
            Lname: reqBody.Lname,
            Mname: reqBody.Mname
        }
        console.log(reqBody.items)

        const cart = await Cart.create({ ...name });
        reqBody.items.forEach(async (item) => {
            const productWithCartId = Object.assign({}, item, { cartId: cart._id })
            await CartField.create({ ...productWithCartId });
        })
        //
        //subproductId yes,subprodu  , cartId yes  , count yes , process add or remove 

        res.status(200).json({ msg: 'sucess' })
    } catch (err) {
        console.log(err)
    }
}





