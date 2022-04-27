const express = require('express')
const UserModel = require('../models/User')
const {body, validationResult} = require('express-validator')
var router = express.Router()

// UserModel.insertMany({Name:"ok"})

router.get('/', (req, res)=>{
    UserModel.find()
             .exec()
             .then(data=>res.json(data))
})

router.get('/:username', (req, res)=>{
    UserModel.find({Username:req.params.username})
             .exec()
             .then(data=>res.json(data))
})
router.get('/id/:id', (req, res)=>{
    UserModel.find({_id:req.params.id})
             .exec()
             .then(data=>res.json(data))
})

router.get('/email/:email', (req, res)=>{
    console.log(req.params.email)
    UserModel.findOne({email:req.params.email})
             .then(data=>{
                 console.log(data)
                 res.json(data)
                })
})

router.post('/users',
         body('username')
            .exists()
            .isLength({min:4}),
         body('email')
            .isEmail()
            .exists(),
         body('age')
            .exists()
            .isLength(2),
         body('city')
            .exists()
            .custom((value, { req })=>{
                const cities = ['Paris', 'Tokyo', 'Los Angeles'];
                if(cities.includes(req.body.city)){
                    return value
                }
            }),

        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const data = req.body
            const User = new UserModel({
                Username: data.username,
                Email:data.email,
                Age:data.age,
                City:data.city            
            })
            User.save().then(ok=>console.log(ok))
            res.send('ok')
})

module.exports = router