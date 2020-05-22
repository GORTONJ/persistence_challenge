const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432,
})

const getStudents = (request, response) => {
  const search = request.query.name
  if(search) {
    pool.query('SELECT * FROM students WHERE to_tsvector(name) @@ to_tsquery($1)',[search], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }   
  else {
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getStudentById = (request, response) => {
   const id = parseInt(request.params.id)
  
   pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const getGrades = (request, response) => {
  pool.query('SELECT * FROM grades ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getGradesById = (request, response) => {
  const id = parseInt(request.params.id)
 
  pool.query('SELECT * FROM grades WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body
 
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
      }
    response.status(201).send(`User added`)
  })
}

const updateGrade = (request, response) => {
    const { name, grades } = request.body
  
    pool.query('INSERT INTO grades (name, grades) VALUES ($1, $2)', [name, grades], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Grade added`)
      }
    )
}

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM student WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getStudents,
    getStudentById,
    getGrades,
    getGradesById,
    updateGrade,
    createUser,
    deleteStudent,

}

