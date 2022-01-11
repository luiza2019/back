const { Op } = require("sequelize");
const { Product } = require("./../models");

const create = async (name, price, brand, type, img, userId) => {
  const product = await Product.create({
    name,
    price,
    brand,
    type,
    img,
    userId,
  });

  return product;
};

const getAll = async ({ q, offset, limit, type }) => {
  if (q || type) {
    if (!q) q = "";
    if (type) {
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
          type,
        },

        limit,
        offset,
      });
    } else {
      return await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: "%" + q + "%",
          },
        },

        limit,
        offset,
      });
    }
  }

  return await Product.findAndCountAll({
    limit,
    offset,
  });
};

const deleteOne = async (id) => {
  return await Product.destroy({ where: { id } });
};
const update = async (id, name, price, brand, type, img) => {
  return await Product.update(
    { name, price, brand, type, img },
    { where: { id } }
  );
};
const getOne = async (id) => {
  const product = await Product.findOne({
    where: { id },
  });
  console.log(product);
  return product.dataValues;
};
module.exports = {
  create,
  deleteOne,
  update,
  getOne,
  getAll,
};
