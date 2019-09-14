const validator =require("validator")
const bcrypt=require("bcryptjs")
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
  if(this.data.password.length>50){
    this.errors.push("Passwords cannot exceed 50 characters")
  } 
  if(this.data.username.length>0 && this.data.username.length<3){
    this.errors.push("Username must be atleast 3 characters")
  }
   if(this.data.username.length>30){
    this.errors.push("Username cannot exceed 30 characters")
  }
  
}
User.prototype.login = function(){
  return new Promise((resolve,reject)=>{
    this.cleanUp()
    usersCollection.findOne({username:this.data.username}).then((attemptedUser)=>{
      if(attemptedUser && bcrypt.compareSync(this.data.password,attemptedUser.password)){
        resolve("congrats")
       
     }else{
      reject("invalid username/password")
       
     }
    }).catch(()=>{
      reject("Please try again later")
    })
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
 
  this.cleanUp()
  this.validate()
  // step 2 only if there's no validation erro save user data into Database
  if(!this.errors.length){
    // hash user password
    let salt=bcrypt.genSaltSync(10)
    this.data.password=bcrypt.hashSync(this.data.password,salt)
    usersCollection.insertOne(this.data)
  }
}

module.exports=User