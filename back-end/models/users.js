"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ posts }) {
      // define association here
      this.hasMany(posts, { foreignKey: "userId", as: "posts" });
      this.belongsToMany(posts, { through: "UserSavedPosts",as:"savedPosts" });
    }
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
        password: undefined,
      };
    }
  }
  users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "invalid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "Email must not be empty" },
          is: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, //Password: P@ssw0rd123
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a role" },
          notEmpty: { msg: "Role must not be empty" },
          isIn: [["user", "author"]],
        },
      },
      // savedPosts: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "users",
    }
  );
  return users;
};
