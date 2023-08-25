
import express from 'express'
import cors from 'cors'

// * confiq imported
import connect from './config/connectDB'
import upload from './config/storage'


// * routers import
import roleRouter from './routes/role.routes'
import resumeRouter from './routes/resume.routes'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use(express.static(__dirname));

console.log(__dirname);


// * connect db
connect()


app.use('/role' , roleRouter)
app.use('/resume' , upload.single('resume') , resumeRouter)

console.log("running")

// ! This middleware function that handles all requests that do not match any of the defined routes in the application
app.use('*' , (_req , response) => {      
      response.status(404).json({'message' : `url = ${ _req.hostname + _req.baseUrl + _req.url} , method = ${_req.method} , Not Found`})
})



app.listen(7878 , () => {
      console.log('server start');
})


export default app
