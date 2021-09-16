const express = require('express');
const fs = require('fs');

const Info = require('../models/info');

// récupere toutes les sauces
exports.getAllInfo = (req, res, next) => {
    Info.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({
            error
        }));
}

// create or reset the bdd
exports.createInfo = (req, res, next) => {
    const info = new Info({
        ...req.body
    });

    info.save()
        .then(() => res.status(201).json({
            message: 'Info saved !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

// modify info
exports.modifyInfo = (req, res, next) => {
    Info.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Info modified !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};