import React from 'react';
import Todo from './Todo';

export default function TodoList({items}) {
    return (
        items.map(todo => {
            return <Todo key={todo.id} todo={todo} />
        })
    )
}