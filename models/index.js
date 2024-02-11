const User = require('./User');
const Comment = require('./Comment');
const Post = require('./post');

Comment.belongsTo(Post, {
  foreignKey: 'id',
  onDelete: 'SET NULL'
})

Post.hasMany(Comment, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

User.hasMany(Post {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

module.exports = { 
  User, 
  Comment, 
  Post };
