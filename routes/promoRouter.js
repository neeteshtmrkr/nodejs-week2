const express=require('express');
const bodyParser=require('body-parser');
//include mongoose
const mongoose=require('mongoose');
const authenticate=require('../authenticate');
const cors=require('./cors');
const Promos=require('../modals/promotions');

const promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Promos.find(req.query)
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Promos.create(req.body)
    .then((promo)=>{
        console.log('Promotions Created!!',promo)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /promo');
})


.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Promos.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
    });

promoRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    Promos.findById(req.params.promoId)
    .then((promo)=>{
        console.log('Promos Created!!',promo);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /promo/'
        +req.params.promoId);
   

})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promo)=>{
        console.log('Promo Created!!',promo);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);

    },(err)=>next(err))
    .catch((err)=>next(err));

})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=promoRouter;
