const { model, Schema } = require("mongoose");

export {};

const postSchema = new Schema({
    body: String,
    username: String,
    createdDate: String,
    comments: [
        {
            body: String,
            username: String,
            createdDate: String,
        }
    ],
    likes: [
        {
            username: String,
            createdDate: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);