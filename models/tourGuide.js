const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const tourGuideSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,

    },
    mobNumber:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        min: 0,
        max: 20,
        required: true
    },
    languages:{
        type: String,
        required: true
    },
    availableArea:{
      type: String,
      required: true
    },
    Fee:{
        type: String,
        required: true
    }
});
const Tourguides = mongoose.model('Tourguide', tourGuideSchema);
module.exports = Tourguides;