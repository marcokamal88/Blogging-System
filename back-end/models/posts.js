'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users, { foreignKey: 'userId' });
      this.belongsToMany(users, { through: "UserSavedPosts" });

    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  posts.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cover_image: DataTypes.STRING,
    summary: DataTypes.STRING,
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    multiple_categories: DataTypes.STRING
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'posts',
  });
  return posts;
};