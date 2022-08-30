const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

// GET /api/tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET /api/tags/:id
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include:[Product],
    });
    if(!singleTag) {
      return res.status(500).json({
        message: `This ID doesn't exist. Please enter a valid ID!`
      })
    }
    res.status(200).json(singleTag);
  } catch(err) {
    res.status(500).json(err)
  }
});

// POST /api/tags
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    return res.status(500).json(err)
  }
});

// PUT /api/tags/:id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const checkTagId = await Tag.findByPk(req.params.id);
    const updateTag = await Tag.update (
      {tag_name: req.body.tag_name},
      {where: {id:req.params.id}}
    );
    if(!checkTagId) {
      return res.status(404),json({message: `This tag ID doesn't exist. Please enter a valid ID!`})
    }
    res.status(200).json(err);
  } catch(err) {
    return res.status(500).json;
  }
});

// DELETE /api/tags/:id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const checkTagId = await Tag.findByPk(req.params.id);
    const deleteTag = await Tag.destroy(
      {where: {id: req.params.id}}
    )
    if(!deleteTag) {
      res.status(404).json ({message: 'No tag found with this ID'})
      return
    }
    res.status(200).json({message: 'Tag Deleted'})
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

module.exports = router;
