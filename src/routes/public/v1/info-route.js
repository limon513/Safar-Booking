const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.get('/',(req,res)=>{
    return res.status(StatusCodes.ACCEPTED).json({msg:'api is live',bdy:req.body});
});

module.exports = router;