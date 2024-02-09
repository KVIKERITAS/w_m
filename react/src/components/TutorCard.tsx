import { TTutor } from '@/pages/TutorsPage'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'

type TTutorCardProps = {
	tutor: TTutor | undefined
}

export const TutorCard = ({ tutor }: TTutorCardProps) => {
	return (
		<Link key={tutor?.id} to={`/${tutor?.id}`}>
			<Card className='hover:bg-secondary/15'>
				<CardHeader>
					<Avatar>
						<AvatarFallback>
							{tutor?.name.charAt(0)}
							{tutor?.surname.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<CardTitle>
							{tutor?.name} {tutor?.surname}
						</CardTitle>
						<CardDescription>{tutor?.tutor_specialization}</CardDescription>
					</div>
				</CardHeader>
				<CardContent>Booked lessons: {tutor?.lessons}</CardContent>
				<CardFooter>
					<Badge>${tutor?.hourly_price} / hr</Badge>
				</CardFooter>
			</Card>
		</Link>
	)
}
