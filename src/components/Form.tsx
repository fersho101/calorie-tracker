import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from '../types'
import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activity-reducers'

type FormProps = {
	dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
	id: uuidv4(),
	category: 1,
	name: '',
	calories: 0,
}

export default function Form({ dispatch }: FormProps) {
	const [activity, setActivity] = useState<Activity>(initialState)

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		const isNumberField = ['category', 'calories'].includes(e.target.id)

		setActivity({
			...activity,
			[e.target.id]: isNumberField ? +e.target.value : e.target.value,
		})
	}

	const isValidActivity = () => {
		const { name, calories } = activity
		return name.trim() !== '' && calories > 0
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: 'save-activity', payload: { newActivity: activity } })
		setActivity({
			...initialState,
			id: uuidv4(),
		})
	}

	return (
		<form
			className='space-y-5 bg-white shadow p-10 rounded-lg'
			onSubmit={handleSubmit}
		>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='category'
					className='font-bold'
				>
					Categoria
				</label>
				<select
					className='border border-slate-300 p-2 rounded-lg w-full bg-white'
					name=''
					id='category'
					value={activity.category}
					onChange={handleChange}
				>
					{categories.map(cat => (
						<option
							key={cat.id}
							value={cat.id}
						>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='name'
					className='font-bold'
				>
					Actividad
				</label>

				<input
					id='name'
					type='text'
					className='border border-slate-300 p-2 rounded-lg'
					placeholder='Ej. Comida, Jugo de naranja, ensalda, ejercicio, pesas, bicicleta'
					value={activity.name}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-1 gap-3'>
				<label
					htmlFor='calories'
					className='font-bold'
				>
					Calorias
				</label>

				<input
					id='calories'
					type='number'
					className='border border-slate-300 p-2 rounded-lg'
					placeholder='Ej. 300 ó 500'
					value={activity.calories}
					onChange={handleChange}
				/>
				<input
					type='submit'
					className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
					value={
						activity.category === 1
							? 'Guardar Comida'
							: 'Guardar Ejercicio'
					}
					disabled={!isValidActivity()}
				/>
			</div>
		</form>
	)
}
