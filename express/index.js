import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import {
	createData,
	getAllTutors,
	getTutorById,
	getTutorLessonsById,
	getTutorsByDate,
	getTutorsByLessonsAsc,
	getTutorsByNameAsc,
	getTutorsByPriceAsc,
	getTutorsBySearch,
} from './db.js'

const app = express()

createData()

app.use(cors())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
	console.log('Server running on http://localhost:8080')
})

app.get('/tutors', async (req, res) => {
	const tutors = await getAllTutors()

	res.send(tutors)
})

app.get('/tutors/:id', async (req, res) => {
	const id = req.params.id

	const tutor = await getTutorById(id)

	res.send(tutor)
})

app.get('/lessons/:id', async (req, res) => {
	const id = req.params.id

	const tutorLessons = await getTutorLessonsById(id)

	res.send(tutorLessons)
})

app.get('/filter/:search', async (req, res) => {
	const { search } = req.params

	const tutors = await getTutorsBySearch(search)

	res.send(tutors)
})

app.post('/filter/date', async (req, res) => {
	const date = req.body

	const filteredTutors = await getTutorsByDate(date)

	res.send(filteredTutors)
})

app.get('/sort/:value', async (req, res) => {
	const { value } = req.params

	let sortedTutors

	switch (value) {
		case 'name':
			sortedTutors = await getTutorsByNameAsc()
			return res.send(sortedTutors)
		case 'price':
			sortedTutors = await getTutorsByPriceAsc()
			return res.send(sortedTutors)
		case 'lessons':
			sortedTutors = await getTutorsByLessonsAsc()
			return res.send(sortedTutors)
		default:
			sortedTutors = await getAllTutors()
			res.send(sortedTutors)
	}
})
