const express = require('express')
const bodyParser = require('body-parser')
const db = require('./students')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/students', db.getStudents)
app.get('/students/:id', db.getStudentById)
app.get('/grades', db.getGrades)
app.get('/grades/:id', db.getGradesById)
app.post('/grade', db.updateGrade)
app.post('/register', db.createUser)
app.delete('/students/:id', db.deleteStudent)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})