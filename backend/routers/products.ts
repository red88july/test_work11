import mongoose, {Types} from "mongoose";
import {Router} from 'express';

import auth, {RequestUser} from "../middleware/auth";
import {ProductDataTypes} from "../types";
import Post from "../models/Product";
import {imageUpload} from "../multer";

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
            price: req.body.price,
            category: req.body.category,
            image: req.file ? req.file.filename : null,
        };

        const newProduct = new Post(productData);
        await newProduct.save();

        res.send(newProduct);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});

// postsRouter.get('/', async (req, res, next) => {
//
//     try {
//
//         const getPosts = await Post.find().populate({path: 'user', select: 'username'}).sort({datetime: -1});
//         return res.send(getPosts);
//
//     } catch (e) {
//         next(e);
//     }
//
// });
//
// postsRouter.get('/:id', async (req, res, next) => {
//
//     try {
//
//         let _id: Types.ObjectId;
//
//         try {
//             _id = new Types.ObjectId(req.params.id);
//         } catch (e) {
//             return res.status(404).send({error: 'Wrong ObjectId'});
//         }
//
//         const getPostById = await Post.findById(_id)
//             .populate({path: 'user', select: 'username'});
//
//
//         return res.send(getPostById);
//
//     } catch (e) {
//         next(e);
//     }
//
// });