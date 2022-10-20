const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findAll({
            include: [{
                model: Product,
                through: ProductTag
            }]
        });
        //terenary operator returning 404 if data returns null/empty and 200 if data is present
        tagData ? res.status(200).json(tagData) : res.status(404).json({ message: 'No data found!' });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findByPk( req.params.id, {
            include: [{
                model: Product,
                through: ProductTag
            }]
        });
        //terenary operator returning 404 if data returns null/empty and 200 if data is present
        tagData ? res.status(200).json(tagData) : res.status(404).json({ message: 'No data found!' });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const newTag = {
            tag_name: req.body.tag_name
        };
        const tagData = await Tag.create(newTag);
        res.status(200).json(tagData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;
