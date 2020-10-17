const { isEmptyRemoveWhiteSpace } = require('./utils');

export {};

function validateCommentInput(
    postId: string,
    body: string
){
    const errors: any = {};
    validatePostId(postId, errors);
    validateBody(body, errors);

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

const validatePostId = (postId: string, errors: any) => {
    if (isEmptyRemoveWhiteSpace(postId)) {
        errors.username = 'Post ID must not be empty.';
    }
};

const validateBody = (body: string, errors: any) => {
    if (isEmptyRemoveWhiteSpace(body)){
        errors.body = 'Body must not be empty.';
    }
}

module.exports = {
    validateCommentInput
}