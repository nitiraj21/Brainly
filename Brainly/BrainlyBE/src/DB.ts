import mongoose, {model, Schema} from 'mongoose';

mongoose.connect(process.env.mongoDB || '');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const contentSchema = new Schema({
    type: { type: String, enum: ["Document", "twitter", "link", "youtube"] },
    link : String,
    title : String,
    tags : [String], 
    userId : {type: Schema.Types.ObjectId, ref: "User"}
});

const LinkSchema = new Schema({
    hash : String,
    userId : {type: Schema.Types.ObjectId, ref: "User", required: true}
});


export const userModel =  model("User", userSchema);
export const contentModel =  model("Content", contentSchema);
export const LinkModel = model("Link", LinkSchema);
