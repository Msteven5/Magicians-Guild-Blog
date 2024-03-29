const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'user',
  onDelete: 'CASCADE'
})

User.hasMany(Post, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
})

User.hasMany(Comment, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
})

module.exports = { 
  User, 
  Comment, 
  Post };
