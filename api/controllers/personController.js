const mongoose = require("mongoose")
const Person = require('../models/personModel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

let save = (req, res) => {
    Person.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const person = new Person({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    })
                    person
                    .save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: "Person created"
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

let login = (req, res) => {
  Person.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            'secret',
            {
              expiresIn: "1h"
            }
          )
          return res.status(200).json({
            message: "Auth successful",
            token: token
          })
        }
        res.status(401).json({
          message: "Auth failed"
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}


let deleted = (req, res) => {
  Person.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Person deleted"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

let findAll = (req,res)=>{
    Person.find()
      .select("name lastName email")
      .exec()
        .then((data)=>{
            res.status(200).json({
              message: 'list of people',
              products: data.map(doc => {
                return {
                  name: doc.name,
                  lastName: doc.lastName,
                  email: doc.email,
                  request: {
                    type: "GET",
                    url: "http://localhost:3000/person/" + doc._id
                  }
                }
              })
            })
        })
        .catch((err)=>{
            return res.status(500).json({
                message: 'an error has ocurred',
                error: err
            })
        })
}

module.exports = {
    savePerson: save,
    loginPerson: login,
    findAllPerson: findAll,
    deletePerson: deleted
}