const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//to make use of mongoose currency
require('mongoose-currency').loadType(mongoose);
//this will load new currency type to mongoose

const Currency=mongoose.Types.Currency;

const promoSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Currency,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

var Promotions=mongoose.model('Promotions',promoSchema);

module.exports=Promotions;