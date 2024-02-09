import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

import lessons from './data/lessons.json' assert { type: 'json' }
import tutors from './data/tutors.json' assert { type: 'json' }

/* 
Enter these variables to .env configuration file
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE= 
*/

const db = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
	})
	.promise()

const dbName = process.env.MYSQL_DATABASE
const dbUseQuery = `USE ${dbName}`

export async function createData() {
	const dbCreateQuery = `CREATE DATABASE ${dbName}`

	const dbCreateTutorsTableQuery = `
	CREATE TABLE tutors (
		id INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR (40) NOT NULL,
		surname VARCHAR(40) NOT NULL,
		tutor_specialization VARCHAR (20) NOT NULL,
		hourly_price INT
	)
	`

	const dbCreateLessonsTableQuery = `
	CREATE TABLE lessons (
		lesson_id INT PRIMARY KEY AUTO_INCREMENT,
		tutor_id INT,
		lesson_date DATE,
		FOREIGN KEY(tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
	)
	`

	try {
		await db.query(dbCreateQuery)
		console.log(`Database ${dbName} successfully created!`)
	} catch (err) {
		console.log(
			`Database with this name already exists! If app doesn't work change MYSQL_DATABASE to a different name!`,
		)
		return
	}

	await db.query(dbUseQuery)
	await db.query(dbCreateTutorsTableQuery)

	tutors.forEach(async tutor => {
		await db.query(dbUseQuery)
		await db.query(
			`
			INSERT INTO tutors (name, surname, tutor_specialization, hourly_price)
			VALUES (?, ?, ?, ?)
			`,
			[
				tutor.name,
				tutor.surname,
				tutor.tutor_specialization,
				tutor.hourly_price,
			],
		)
	})

	await db.query(dbUseQuery)
	await db.query(dbCreateLessonsTableQuery)

	lessons.forEach(async lesson => {
		await db.query(dbUseQuery)
		await db.query(
			`
			INSERT INTO lessons (tutor_id, lesson_date)
			VALUES (?, ?)
			`,
			[lesson.tutor_id, lesson.lesson_date],
		)
	})
}

export async function getTutorById(id) {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`
	SELECT tutors.id, tutors.name, tutors.surname, tutors.tutor_specialization, tutors.hourly_price, COUNT(tutor_id) AS lessons
	FROM tutors
	LEFT JOIN lessons ON tutors.id = lessons.tutor_id
	WHERE tutor_id = ?
	GROUP BY tutors.id, tutors.name, tutors.surname, tutors.tutor_specialization, tutors.hourly_price
	`,
		[id],
	)

	return rows[0]
}

export async function getTutorLessonsById(id) {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`
	SELECT * 
	from lessons
	WHERE tutor_id = ?`,
		[id],
	)

	return rows
}

export async function getTutorsByDate(date) {
	await db.query(dbUseQuery)
	const { from, to } = date

	const [rows] = await db.query(
		`
	SELECT
    tutors.id,
    tutors.name,
    tutors.surname,
    tutors.tutor_specialization,
    tutors.hourly_price,
    	(
				SELECT COUNT(tutor_id) 
				FROM lessons 
				WHERE tutor_id = id) AS lessons
		FROM
    tutors
		WHERE
    tutors.id NOT IN (
        SELECT tutor_id
        FROM lessons
        WHERE lesson_date >= ? AND lesson_date <= ?
    )
	`,
		[from, to],
	)

	return rows
}

export async function getTutorsBySearch(search) {
	const mysqlSearch = `%${search}%`

	await db.query(dbUseQuery)
	const [rows] = await db.query(
		`
		SELECT 
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price, 
    COUNT(lessons.tutor_id) AS lessons
FROM 
    tutors
LEFT JOIN 
    lessons ON tutors.id = lessons.tutor_id
WHERE 
    tutors.name LIKE ? 
    OR tutors.surname LIKE ?
GROUP BY
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price;
	`,
		[mysqlSearch, mysqlSearch],
	)

	return rows
}

export async function getAllTutors() {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`SELECT 
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price, 
    COUNT(lessons.tutor_id) AS lessons
FROM 
    tutors
LEFT JOIN 
    lessons ON tutors.id = lessons.tutor_id
		GROUP BY
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price;
		`,
	)

	return rows
}

export async function getTutorsByNameAsc() {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`SELECT 
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price, 
    COUNT(lessons.tutor_id) AS lessons
FROM 
    tutors
LEFT JOIN 
    lessons ON tutors.id = lessons.tutor_id
GROUP BY
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price
ORDER BY
    tutors.name ASC
		`,
	)

	return rows
}

export async function getTutorsByPriceAsc() {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`SELECT 
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price, 
    COUNT(lessons.tutor_id) AS lessons
FROM 
    tutors
LEFT JOIN 
    lessons ON tutors.id = lessons.tutor_id
GROUP BY
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price
ORDER BY
    tutors.hourly_price ASC;
		`,
	)

	return rows
}

export async function getTutorsByLessonsAsc() {
	await db.query(dbUseQuery)

	const [rows] = await db.query(
		`SELECT 
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price, 
    COUNT(lessons.tutor_id) AS lessons
FROM 
    tutors
LEFT JOIN 
    lessons ON tutors.id = lessons.tutor_id
GROUP BY
    tutors.id, 
    tutors.name, 
    tutors.surname, 
    tutors.tutor_specialization, 
    tutors.hourly_price
ORDER BY
    lessons ASC
		`,
	)

	return rows
}
