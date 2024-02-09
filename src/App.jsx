import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

import { TodoProvider } from './contexts';

function App() {
	const [todos, setTodos] = useState([]);
	// the disbale state is for button disability if there is no clicked todo
	const [disable, setDisable] = useState(true);
	// the visible state is for button hidden if there is no todo in the todos array
	const [visible, setVisible] = useState(false);
	const addTodo = todo => {
		setTodos(prev => [{ id: Date.now(), ...todo }, ...prev]);
	};
	const updateTodo = (id, todo) => {
		setTodos(prev => prev.map(item => (item.id === id ? todo : item)));
	};

	const deleteTodo = id => {
		setTodos(prev => prev.filter(item => item.id !== id));
	};

	const toggleComplete = id => {
		setTodos(prev =>
			prev.map(item =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};
	const deleteCompleted = () => {
		console.log('clicked');
		setTodos(prev =>
			prev.filter(item => {
				return item.completed != true;
			})
		);
		setDisable(true);

		// setTodos(prev =>
		// 	prev.filter(item => {
		// 		return item.completed != true;
		// 	})
		// );
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && todos.length > 0) {
			setTodos(todos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
		if (todos.length > 0) {
			setVisible(false);
			const clicked = todos.filter(item => {
				return item.completed == true;
			});
			if (clicked?.length > 0) {
				setDisable(false);
			}
		} else {
			setVisible(true);
		}
	}, [todos]);

	return (
		<TodoProvider
			value={{
				todos,
				addTodo,
				updateTodo,
				deleteTodo,
				toggleComplete,
				deleteCompleted,
			}}
		>
			<div className='bg-[#172842] min-h-screen py-8'>
				<div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
					<h1 className='text-2xl font-bold text-center mb-8 mt-2'>
						Todos App with ContextApi
					</h1>
					{/* call todoForm */}
					<div className='mb-4'>
						<TodoForm />
					</div>
					{/* call todoItem  */}
					<div className='flex flex-wrap gap-y-3'>
						{/* Here Item means single todo that has id,title and completed status */}
						{todos?.map(item => (
							<div className='w-full' key={item.id}>
								<TodoItem todo={item} />
							</div>
						))}
					</div>
					{/* deleteCompleted Btn */}

					<div
						className={` w-full mt-5 text-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 font-bold bg-blue-900  ${
							visible ? 'hidden' : 'block'
						} text-white`}
					>
						<button
							className='w-full'
							onClick={deleteCompleted}
							disabled={disable}
						>
							Delete Completed
						</button>
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
