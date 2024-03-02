import mongoose, {Types} from "mongoose";
import {Router} from 'express';

import auth, {RequestUser} from "../middleware/auth";
import {ProductDataTypes} from "../types";
import Post from "../models/Product";
import {imageUpload} from "../multer";
import Product from "../models/Product";

export const productsRouter = Router();

productsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestUser, res, next) => {

    try {
        if (req.body.price < 0 || req.body.price === 0) {
            return res.status(422).send({message: `Field Price is not to be an zero or < 0`});
        }

        const productData: ProductDataTypes = {
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            price: parseInt(req.body.price),
            category: req.body.category,
            image: req.file ? req.file.filename : null,
        };

        const newProduct = new Product(productData);
        await newProduct.save();

        res.send(newProduct);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});

productsRouter.get('/', async (_req, res, next) => {

    try {

        const getProduct = await Product.find();
        return res.send(getProduct);

    } catch (e) {
        next(e);
    }

});

productsRouter.get('/:id', async (req, res, next) => {

    try {

        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({error: 'Wrong ObjectId'});
        }

        const getPostById = await Product.findById(_id)
            .populate({path: 'user', select: 'name phone'});


        return res.send(getPostById);

    } catch (e) {
        next(e);
    }

});