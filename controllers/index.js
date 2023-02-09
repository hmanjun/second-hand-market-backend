const router = require('express').Router()

router.get('/', async(req,res) => {
    try {
        res.status(200).json({message: "Reached api!"})
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router