import { Schema, model, Types } from "mongoose";
import User from "./User";

const ProductSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            }
        }
    },

    title: {
        type: String,
        required: true,
    },

    description: String,

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    image: String,

}, { versionKey: false });

const Product = model('Product', ProductSchema);

export default Product;