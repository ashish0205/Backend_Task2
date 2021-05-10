const { Router } = require("express");

const express = require('express');
const router = express.Router();
const apiConteroller = require("../controller/api");

/**
    * @swagger
    * /api/wallet:
    *   get:
    *     tags:
    *       - API
    *     description: Get User wallet
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: uId
    *         description: User Id
    *         in: query
    *         type: string

    *     responses:
    *       200:
    *         description: Get Wallet   
    *       400:
    *         description: Invalid Request. Please try again. 
    *
    */
router.get("/api/wallet", apiConteroller.getWallet);


/**
    * @swagger
    * /api/wallet:
    *   post:
    *     tags:
    *       - API
    *     description: Get User wallet
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
 
    *       - name: uId
    *         description: User Id
    *         in: formData
    *         type: string

    *       - name: wallet
    *         description: Wallet Amount
    *         in: formData
    *         type: string

    *     responses:
    *       200:
    *         description: Add Wallet   
    *       400:
    *         description: Invalid Request. Please try again. 
    *
    */
router.post("/api/wallet", apiConteroller.addWallet);


/**
    * @swagger
    * /api/trade:
    *   post:
    *     tags:
    *       - API
    *     description: Trade of Between Users
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
 
    *       - name: buyer
    *         description: buyer Id
    *         in: formData
    *         type: string
 
    *       - name: seller
    *         description: seller Id
    *         in: formData
    *         type: string

    *       - name: share
    *         description: Number of Share to be Trade off
    *         in: formData
    *         type: string

    *     responses:
    *       200:
    *         description: Add Wallet   
    *       400:
    *         description: Invalid Request. Please try again. 
    *
    */
router.post("/api/trade", apiConteroller.buyAndsell);
module.exports = router;