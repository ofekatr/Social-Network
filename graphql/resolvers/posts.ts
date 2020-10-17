const Post = require('../../models/Post');

export {};

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                console.log(posts);
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
};