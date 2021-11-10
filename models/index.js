const User = require('./User');
const Post = require('./Post');

//create one-to-many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//define relationship between Post to User - Post can belong to one user, and define foreign key
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };
