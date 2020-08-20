module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("images", {
    title: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });

  return Image;
};


