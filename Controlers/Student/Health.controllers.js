const express = require('express');
const Health = require('../../Models/Student/Health.model');
const Times = require("../Suger/Times");

exports.postHealth = async (req, res) => {
    console.log(req.body);
    // let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    req.body.lastUpdate = Times.LastUpdate();
    try {
        await Health.create(req.body);
        res.status(201).json({ message: 'success', data: req.body });
    } catch (err) {
        res.status(404).json({
            message: 'fail',
            err
        });
    }

}

