const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const authenticate = require('../../utils/check-auth');

export { };

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdDate: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                }
                throw new Error('Post does not exist.');
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = authenticate(context);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdDate: new Date().toISOString()
            });

            const post = await newPost.save();
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = authenticate(context);
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully.';
                }
                throw new Error('Post does not belong to this user.');
            } catch (err) {
                throw new Error(err);
            };
        }
    }
};