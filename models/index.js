const User = require('./User');
const Comment = require('./Comment');
const Post = require('./post');

// Products belongsTo Category
Comment.belongsTo(Post, {
  foreignKey: 'id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: ProductTag
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
module.exports = { User };
