const User=require("../models/User")
exports.login=function(){

}
exports.logout=function(){
  
}

exports.register=function (req,res){
  let user= new User()
  user.homePlanet
  res.send("THanks for trying to register")  
}
exports.home=function(req,res){
  res.render('home-guest')
}