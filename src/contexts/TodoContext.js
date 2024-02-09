import { createContext, useContext } from 'react';

export const TodoContext = createContext({
	todos: [
		{
			id: '2',
			title: '',
			conpleted: false,
		},
	],
	addTodo: todo => {},
	updateTodo: (todo, id) => {},
	deleteTodo: id => {},
	toggleComplete: id => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
	return useContext(TodoContext);
};
