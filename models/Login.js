const mongoose = require('mongoose');
const express = require('express');

const userSchema = mongoose.Schema({
    surname: {type: String, required: true},
    name: {type: String, required: true},
    message: {type: String, required: true},
    phone: {type: String, required: true},
    date: {type: Date, required: true},
})

const Login = mongoose.model('Message', userSchema)

module.exports = Login