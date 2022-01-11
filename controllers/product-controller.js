const ProductService = require("./../services/product-service");
const {
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  UPDATED_SUCCESSFUULY,
} = require("../utils/consts");

const create = async (req, res, next) => {
  try {
    const { name, price, brand, type, img } = req.body;
    const { id } = req.user;
    await ProductService.create(name, price, brand, type, img, id);
    res.json({ message: CREATE_SUCCESS });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, type } = req.query;
    page = page || 1;
    limit = limit || 8;
    const offset = page * limit - limit;
    const products = await ProductService.getAll({ offset, limit, q, type });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Type not found" });
  }
};
const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getOne(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "product not found" });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteOne(id);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { name, price, brand, type, img } = req.body;

    const { id } = req.params;
    await ProductService.update(id, name, price, brand, type, img);
    res.json({ message: UPDATED_SUCCESSFUULY });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
};
