const User = require('./User');
const Post = require('./Post');
const Vote = require('./Votes');
const Comment = require('./Comment');

//create one-to-many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//define relationship between Post to User - Post can belong to one user, and define foreign key
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//using a vote, we can see which users voted on a single post - user_id is the foreign key
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

//using vote, we can see which posts a single user voted on - post_id is the foreign key
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});
module.exports = { User, Post, Vote, Comment };

