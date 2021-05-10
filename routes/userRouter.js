const { Router } = require("express");

const express = require('express');
const router = express.Router();
const userConteroller = require("../controller/users");
/**
    * @swagger
    * /users/signup:
    *   post:
    *     tags:
    *       - Users
    *     description: Add new user
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: firstname
    *         description: Firstname
    *         in: formData
    *         required: true
    *         type: string

    *       - name: lastname
    *         description: Lastname
    *         in: formData
    *         required: true
    *         type: string

    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: password
    *         description: password
    *         in: formData
    *         required: true
    *         type: string

    *       - name: phone
    *         description: Phone number
    *         in: formData
    *         required: true
    *         type: string
    
    *     responses:
    *       201:
    *         description: User created successfully    
    *       409:
    *         description: User already exists    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post("/users/signup", userConteroller.signup);

/**
    * @swagger
    * /users/login:
    *   post:
    *     tags:
    *       - Users
    *     description: Login User
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: password
    *         description: password
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       201:
    *         description: User created successfully    
    *       409:
    *         description: User already exists    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post("/users/login", userConteroller.login);


module.exports = router;