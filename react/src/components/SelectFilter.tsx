import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TTutor } from '@/pages/TutorsPage'
import { getTutorsByFilter } from '@/utils'

type TSelectFilterProps = {
	setTutors: React.Dispatch<React.SetStateAction<TTutor[]>>
}

export const SelectFilter = ({ setTutors }: TSelectFilterProps) => {
	const handleFilter = async (value: string) => {
		const tutors = await getTutorsByFilter(value)
		setTutors(tutors)
	}

	return (
		<Select
			onValueChange={value => {
				handleFilter(value)
			}}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Filter' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Sort By</SelectLabel>
					<SelectItem value='name'>Name (A - Z)</SelectItem>
					<SelectItem value='price'>Price (Low - High)</SelectItem>
					<SelectItem value='lessons'>Lessons (Low - High)</SelectItem>
					<SelectItem value='reset'>No sort</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
