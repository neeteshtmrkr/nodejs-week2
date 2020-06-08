const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader=('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('Will send all the promotions to you!');
})

.post((req,res,next)=>{
    res.end('Will add the promo: '+ req.body.name + 'with  details: '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /promo');
})


.delete((req,res,next)=>{
    res.end('Deleting all the promos!');
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Will Send details of the promo:'
        +req.params.promoId + 'to you');

})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /promo/'
        +req.params.promoId);
   

})

.put((req, res, next) => {
    statusCode = 403;
    res.write('Updation the promotion:' +req.params.promoId + '\n');
    res.end('Will update the promotion: ' +req.body.name + 'with details' +req.body.description)

})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' +req.params.promoId);

});

module.exports=promoRouter;
