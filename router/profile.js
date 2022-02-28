'use strict';

const express = require('express')
const router = express.Router()


router.get('/:userid',(req,res)=>{
    res.send('ini halaman profile')
})

router.get('/:userid/edit',(req,res)=>{
  res.send('ini edit profile')
})

module.exports = router