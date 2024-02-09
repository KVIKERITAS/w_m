import { TutorCard } from '@/components/TutorCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getLessonsById, getTutorById } from '@/utils'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TTutor } from './TutorsPage'

type TLesson = {
	lesson_id: number
	tutor_id: number
	lesson_date: Date
}

export default function SingleTutorPage() {
	const { tutorId } = useParams<{ tutorId: string }>()
	const [tutor, setTutor] = useState<TTutor>()
	const [lessons, setLessons] = useState<TLesson[]>()

	useEffect(() => {
		const loadTutors = async () => {
			const tutor = await getTutorById(tutorId)

			setTutor(tutor)
		}
		loadTutors()
	}, [tutorId])

	useEffect(() => {
		const loadLessons = async () => {
			const lessons = await getLessonsById(tutorId)

			setLessons(lessons)
		}

		loadLessons()
	}, [tutorId])

	return (
		<div className='w-full px-4 md:px-6'>
			<div className='max-w-5xl mx-auto space-y-4 mt-10'>
				<Link to='/'>
					<Button className='mb-10'>
						<ArrowLeft className='h-4 w-4 mr-1' />
						All tutors
					</Button>
				</Link>
				<TutorCard tutor={tutor} />
				<p>Booked lesson dates:</p>
				{lessons?.map(lesson => {
					const date = new Intl.DateTimeFormat('en-us').format(
						new Date(lesson.lesson_date),
					)
					return (
						<Badge
							className='mr-2'
							variant='destructive'
							key={lesson.lesson_id}
						>
							{date}
						</Badge>
					)
				})}
			</div>
		</div>
	)
}
