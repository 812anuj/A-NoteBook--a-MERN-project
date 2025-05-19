const connectToMongo = require('./ds')
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000


app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Anuj!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))


app.listen(port, () => {
  console.log(`A-NoteBook app listening on port ${port}`)
})