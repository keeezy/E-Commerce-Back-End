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
  try {
    const checkID = await Tag.findByPk(req.params.id)
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!checkID) {
      res.status(404).json('No Tag found with this id!')
      return;
    }
    res.status(200).json('Tag has been updated')
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

// DELETE /api/tags/:id
router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!delTag) {
      res.status(404).json({ message: 'No Tag found with that id!' })
      return;
    }
    res.status(200).json({ mesage: 'Tag Deleted' })
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

module.exports = router;
