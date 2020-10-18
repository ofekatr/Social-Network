const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const { validatePostInput } = require('../../utils/validators');
const authenticate = require('../../utils/check-auth');
const { PUBSUB_STRINGS: { NEW_POST }} = require('../../config');

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
                throw new UserInputError('Post does not exist.');
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = authenticate(context);
            const { errors, valid } = validatePostInput(body);
            if (!valid){
                throw new UserInputError('Invalid input.', { errors });
            }
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdDate: new Date().toISOString(),
            });
            try {
                const post = await newPost.save();
                context.pubsub.publish(NEW_POST, {
                    newPost: post
                });
                return post;
            } catch (err) {
                throw new Error(err);
            }
        },
        async deletePost(_, { postId }, context) {
            const user = authenticate(context);
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully.';
                }
                throw new AuthenticationError('Post does not belong to this user.');
            } catch (err) {
                throw new Error(err);
            };
        }       
    },
    Subscription: {
        newPost: {
            subscribe: (_: any, __: any, { pubsub }: any) => pubsub.asyncIterator(NEW_POST)
        }
    }
};