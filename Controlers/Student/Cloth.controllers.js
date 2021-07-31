const express = require("express");
const Cloth = require("../../Models/Student/Cloth.model");
const Times = require("../Suger/Times");
exports.addCloth = async (req, res) => {
    req.body.lastUpdate = Times.LastUpdate();
    console.log(req.body)
    try {
        await Cloth.create(req.body);
        res.status(201).json({ msg: 'success', data: req.body })

    } catch (err) {
        res.status(404).json({ msg: "fail", err })
        console.log(err)
    }
}