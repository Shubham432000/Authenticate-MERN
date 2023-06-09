const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const keysecret = "shubhamsandipaherjavascriptwebdeveloper"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.cpassword = await bcrypt.hash(this.cpassword, 12);

  next()
});

// token generate 

userSchema.methods.generateAuthtoken=async function(){
try{
  let token= jwt.sign({_id:this._id},keysecret,{
    expiresIn:"1d"
  })
  this.tokens=this.tokens.concat({token:token})
  await this.save()
  return token;
}catch(err){
console.log(err)
}
}

const users = new mongoose.model("users", userSchema);

module.exports = users;
