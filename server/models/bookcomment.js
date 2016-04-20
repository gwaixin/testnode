'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookComment = sequelize.define('BookComment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BookComment;
};