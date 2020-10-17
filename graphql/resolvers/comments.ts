const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const { validateCommentInput } = require('../../utils/validators/index');
const authenticate = require('../../utils/check-auth');

export { };

module.exports = {
    Mutation: {
        async createComment(_, {
             commentInput: { postId, body }
        }, context) {
            const { username } = authenticate(context);
            const { valid, errors } = validateCommentInput(postId, body);
            if (!valid){
                throw new UserInputError('Invalid input.', { errors });
            }
            const post = await Post.findById(postId);
            if (post){
                post.comments.unshift({
                    body,
                    username,
                    createdDate: new Date().toISOString()
                })
                await post.save();
                return post;
            }
            throw new UserInputError('Post does not exist.');
        },
        async deleteComment(_, {
            postId, commentId 
        }, context){
            const { username } = authenticate(context);
            const post = await Post.findById(postId);
            if (post) {
                const commentInd = post.comments.findIndex((c) => c.id === commentId);
                if (commentInd !== -1) {
                    const commentUsername = post.comments[commentInd].username
                    if (username === post.username || commentUsername === username){
                        post.comments.splice(commentInd, 1);
                        await post.save();
                        return post;
                    }
                    throw new AuthenticationError('This action is not allowed.')
                }
                throw new UserInputError('Comment does not exist.')
            }
            throw new UserInputError('Post does not exist.')
        }
    }
}