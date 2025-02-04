const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//to make use of mongoose currency
require('mongoose-currency').loadType(mongoose);
//this will load new currency type to mongoose

const Currency=mongoose.Types.Currency;

const leadersSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },description:{
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

var Leaders=mongoose.model('Leaders',leadersSchema);

module.exports=Leaders;