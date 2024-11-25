require("dotenv").config()
const express = require("express") //commonjs
const configViewEngine = require("./src/config/viewEngine") //commonjs
const webRouters = require("./src/routers/web")
const connection = require("./src/config/database")

const app = express()
const port = process.env.PORT || 8888

//config template engine
configViewEngine(app)

//config req.body
app.use(express.json()) //for json
app.use(express.urlencoded({ extended: true })) //for form data
//khai báo router
app.use("/api/user", webRouters)



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
