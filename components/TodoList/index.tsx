import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import { NextRouter, useRouter } from 'next/router';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router:NextRouter  = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = async () => {
    const response = await fetch('/api/logout', { method: 'POST' });

    if (response.ok) {
      router.push('/login');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className='flex justify-between mb-4'>
        <h2 className="text-2xl font-bold">Todo List</h2>
        <Button className="bg-[#002D74] rounded-xl text-sm text-white p-6 hover:scale-105 duration-300" onClick={handleLogout} type="button">Log Out</Button>   
      </div> 
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-4 border rounded-md shadow-md bg-white">
            <div>
              <h3 className="text-lg font-semibold">{todo.title}</h3>
              <p className="text-sm text-gray-500">User ID: {todo.userId}</p>
            </div>
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                todo.completed ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {todo.completed ? '✔' : '✖'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
