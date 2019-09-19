const express=require("express")
const session=require("express-session")
const flash=require("connect-flash")
const MongoStore=require("connect-mongo")(session)

const app=express()
let sessionOptions=session({
  secret:"Javascript is so cool",
  store:new MongoStore({client:require('./db')}),
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*60*24*7,httpOnly:true
  }
})
app.use(sessionOptions)
app.use(flash())
app.use(function(req,res,next){
  // make userid available
  if(req.session.user){
    req.visitorId=req.session.user._id
  }else{
    req.visitorId=0
  }
  // make user session available from within view templates
  res.locals.user=req.session.user
  next()
})
const router=require("./router")
//html form submit and get the data from req. body
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(express.static('public'))
app.set('views','views')
app.set('view engine', 'ejs')

app.use("/",router)



module.exports=app