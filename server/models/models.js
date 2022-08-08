const sequelize = require('../db.js');
const { DataTypes} = require('sequelize')

const User = sequelize.define( 'user', { 
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

const Post = sequelize.define( 'post', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  content: {type: DataTypes.STRING},
  picture: {type: DataTypes.STRING, allowNull: false},
});

// (async () => {
//   await User.sync({ force: true });
//   // Code here
// })(); 
 
User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
  User,
  Post
} 