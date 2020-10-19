const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const authenticate = require('../../utils/check-auth');

export { };

module.exports = {
    Mutation: {
        async likePost(_, { postId }, context) {
            const { username } = authenticate(context);
            try {
                const post = await Post.findById(postId);
                if (post) {
                    const likeInd = post.likes.findIndex((l) => {
                        return l.username === username
                    });
                    if (likeInd === -1) {
                        post.likes.push({
                            username,
                            createdDate: new Date().toISOString()
                        });
                    } else {
                        post.likes.splice(likeInd, 1);
                    }
                    await post.save();
                    return post;
                }
                throw new UserInputError('Post does not exist.');
            } catch (err) {
                throw err;
            }
        }
    }
}