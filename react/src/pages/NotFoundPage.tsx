import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
	return (
		<div className='flex flex-col items-center justify-center h-[100vh] gap-5'>
			<div>404 Not Found</div>

			<Button variant='default' size='lg' asChild>
				<Link to='/'>Go back</Link>
			</Button>
		</div>
	)
}
