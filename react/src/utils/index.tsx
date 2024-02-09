import axios from 'axios'
import { DateRange } from 'react-day-picker'

export const getTutorsBySearch = async (search: string) => {
	if (search === '') {
		const response = await axios.get(`http://localhost:8080/tutors`)

		return response.data
	}

	const response = await axios.get(`http://localhost:8080/filter/${search}`)

	return response.data
}

export const getTutorsByFilter = async (value: string) => {
	const response = await axios.get(`http://localhost:8080/sort/${value}`)

	return response.data
}

export const getTutorsByDate = async (date: DateRange | undefined) => {
	const response = await axios.post('http://localhost:8080/filter/date', date)

	return response.data
}

export const getTutorById = async (tutorId: string | undefined) => {
	const response = await axios.get(`http://localhost:8080/tutors/${tutorId}`)

	return response.data
}

export const getLessonsById = async (tutorId: string | undefined) => {
	const response = await axios.get(`http://localhost:8080/lessons/${tutorId}`)

	return response.data
}
