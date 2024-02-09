import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

import { TodoProvider } from './contexts';

function App() {
	const [todos, setTodos] = useState([]);

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
		setTodos(prev =>
			prev.filter(item => {
				return item.completed != true;
			})
		);
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && todos.length > 0) {
			setTodos(todos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
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
						Manage Your Todos
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
						className={` w-full mt-5 text-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 font-bold bg-blue-900  text-white`}
					>
						<button onClick={deleteCompleted}>
							Delete Completed
						</button>
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
