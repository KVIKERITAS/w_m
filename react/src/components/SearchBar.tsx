import { useDebounce } from '@/hooks/useDebounce'
import { TTutor } from '@/pages/TutorsPage'
import { getTutorsBySearch } from '@/utils'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'

type TSearchBarProps = {
	setTutors: React.Dispatch<React.SetStateAction<TTutor[]>>
}

export const SearchBar = ({ setTutors }: TSearchBarProps) => {
	const [search, setSearch] = useState<string>('')
	const debouncedSearch = useDebounce(search)

	useEffect(() => {
		const loadTutors = async () => {
			const tutors = await getTutorsBySearch(debouncedSearch)

			setTutors(tutors)
		}

		loadTutors()
	}, [debouncedSearch, setTutors])

	return (
		<Input
			placeholder='Search tutors'
			type='search'
			onChange={e => setSearch(e.target.value)}
		/>
	)
}
