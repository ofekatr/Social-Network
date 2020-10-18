const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const authenticate = require('../../utils/check-auth');

export { };

module.exports = {
    Mutation: {
        async likePost(_, { postId }, context) {
            const { username } = authenticate(context);
            const post = await Post.findById(postId);
            if (post) {
                const likeInd = post.likes.findIndex((l) => {
                    console.log(username, l.username);
                    return l.username === username
                });
                console.log(likeInd);
                if (likeInd === -1) {
                    post.likes.unshift({
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
        }
    }
}