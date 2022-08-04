const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET api/categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/categories/:id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if(!categoryById) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(categoryById);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST api/categories
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch(err) {
    return res.status(500).json(err)
  }
});

// PUT api/categories/:id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = await Category.findByPk(req.params.id);
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    );
    if(!categoryId) {
      return res.status(500).json({message: `This category ID doesn't exist. Please enter a valid category ID!`})
    }
    res.status(200).json(updatedCategory)

  } catch(err) {
    return res.status(500).json(err)
  }
});

// DELETE api/categroies/:id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {id:req.params.id},
    });
    if(!deleteCategory) {
      return res.status(500).json({message: `This category ID doesn't exist. Please enter a valid category ID!`})
    };
    res.status(200).json(deleteCategory);
  } catch(err) {
    return res.status(500).json(err)
  }
});

module.exports = router;
