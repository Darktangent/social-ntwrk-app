const validator =require("validator")
const usersCollection= require('../db').collection("users")
let User=function(data){
this.data=data
this.errors=[]

}
User.prototype.validate=function(){
  if(this.data.username==""){
    this.errors.push("Must provide username")
  }
  if(this.data.username!="" && !validator.isAlphanumeric(this.data.username)){
    this.errors.push("Usernames can only contain letters and numbers")
  }
  if(!validator.isEmail(this.data.email)){
    this.errors.push("Must provide email")
  }
  if(this.data.password==""){
    this.errors.push("Must provide a valid email")
  }
  if(this.data.password.length>0 && this.data.password.length<12){
    this.errors.push("Password must be atleast 12 characters")
  }
  if(this.data.password.length>100){
    this.errors.push("Passwords cannot exceed 100 characters")
  } 
  if(this.data.username.length>0 && this.data.username.length<3){
    this.errors.push("Username must be atleast 3 characters")
  }
   if(this.data.username.length>30){
    this.errors.push("Username cannot exceed 30 characters")
  }
  
}
User.prototype.login = function(callback){
  this.cleanUp()
  usersCollection.findOne({username:this.data.username},(err,attemptedUser)=>{
    if(attemptedUser && attemptedUser.password==this.data.password){
     callback("congrats")
      
    }else{
     callback("invalid username/password")
      
    }
  })
}
User.prototype.cleanUp=function(){
  if(typeof(this.data.username) != "string"){
    this.data.username=""
  }
  if(typeof(this.data.email) != "string"){
    this.data.email=""
  }
  if(typeof(this.data.password) != "string"){
    this.data.password=""
  }
  // get rid of bogus data
  this.data={
    username:this.data.username,
    email:this.data.email,
    password:this.data.password
  }
}
User.prototype.register=function(){
  // step 1 validate user data
 
  
  this.validate()
  // step 2 only if there's no validation erro save user data into Database
  if(!this.errors.length){
    usersCollection.insertOne(this.data)
  }
}

module.exports=User