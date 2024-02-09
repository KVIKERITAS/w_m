import { CalendarFilter } from '@/components/CalendarFilter'
import { SearchBar } from '@/components/SearchBar'
import { SelectFilter } from '@/components/SelectFilter'
import { TutorCard } from '@/components/TutorCard'
import { useState } from 'react'

export type TTutor = {
	id: string
	name: string
	surname: string
	tutor_specialization: string
	hourly_price: number
	lessons: number
}

export default function TutorsPage() {
	const [tutors, setTutors] = useState<TTutor[]>([])

	return (
		<div className='w-full px-4 md:px-6'>
			<div className='max-w-5xl mx-auto space-y-4 mt-10'>
				<div className='space-y-2'>
					<div className='text-3xl font-bold'>Tutors</div>
					<div className='text-gray-500'>Search for tutors by name</div>
				</div>
				<div className='space-y-4'>
					<div className='flex gap-2'>
						<SearchBar setTutors={setTutors} />
						<CalendarFilter setTutors={setTutors} />
						<SelectFilter setTutors={setTutors} />
					</div>
					<div className='grid gap-4 md:grid-cols-2'>
						{tutors.map(tutor => (
							<TutorCard key={tutor.id} tutor={tutor} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
