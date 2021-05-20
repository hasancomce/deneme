const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const path = require('path')



router.get('/', (req, res) => {
    res.render('site/index')
})

router.get('/items', (req, res) => {
    Item.find()
    .sort({$natural:-1}) 
    .then(items => {
        res.render('site/getitems', {items: items.map(items => items.toJSON())})
    })
})

router.get('/additem', (req, res) => {
    res.render('site/additem')
})

router.post('/additem', (req, res) => {
   
    if (req.files !== null) {
    let item_image = req.files.image

    item_image.mv(path.resolve(__dirname, '../public/img/item-images', item_image.name))
    
    Item.create({
        ...req.body,
        image: `/img/item-images/${item_image.name}`
    })
    } else {
        Item.create({
            ...req.body,
            image: `/img/item-images/default-item-image.jpg`
        })
    }
    res.redirect('/items')
      
})

router.post('/updateitem', (req, res) => {
    
    Item.findByIdAndUpdate({_id: req.body._id}, req.body, { new: true }, (err, item) => {
        if (!err) {
            res.redirect('/items')
        } else {
            console.log('Error in item update: ' + err)
        }
    })
})

router.get('/items/:id', (req, res) => {

    Item.findOne({_id: req.params.id}, (err, item) => {
        if (!err) {
            res.render('site/updateitem', {item: item.toJSON()})
        }
        else {
            console.log('Error in item get: ' + err)
        }
    })
})

router.get('/items/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, item) => {
        if (!err) {
            res.redirect('/items')
        } else {
            console.log('Error in item delete: ' + err)
        }
    })
})


module.exports = router