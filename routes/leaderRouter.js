const express=require('express');
const bodyParser=require('body-parser');
//include mongoose
const mongoose=require('mongoose');
//import authenticate
const authenticate=require('../authenticate');
const cors=require('./cors');

const Leaders=require('../modals/leaders');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Leaders.find(req.query)
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('Promotions Created!!',leader)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /leaders');
})


.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
    });

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        console.log('Leaders Created!!',leader);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));

})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /leader/'
        +req.params.leaderId);
   

})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        console.log('Leaders Created!!',leader);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);

    },(err)=>next(err))
    .catch((err)=>next(err));

})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));

});

module.exports=leaderRouter;
