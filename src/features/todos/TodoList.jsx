import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/apiSlice'


const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [ addTodo ] = useAddTodoMutation()
    const [ updateTodo ] = useUpdateTodoMutation()
    const [ deleteTodo ] = useDeleteTodoMutation()


    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({
            userId: 22222,
            title: newTodo,
            completed: false,
        })
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item: </label>
            <div className="new-todo">
                <input type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    if (isLoading) {
        content = <p>Loading</p>
    } else if (isError) {
        content = <p>{error}</p>
    } else if (isSuccess) {
        content = todos.map(
            (todo) => (
                <article key={todo.id}>
                    <input type="checkbox"
                        checked={todo.completed}
                        id={todo.id}
                        onChange={() => updateTodo({
                            ...todo,
                            completed: !todo.completed
                        })}
                    />
                    <label htmlFor={todo.id}>
                        {todo.title}
                    </label>
                    <button onClick={() => deleteTodo(todo)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        )
    }


    return (
        <section>
            <h1>Todo list:</h1>
            {newItemSection}
            {content}
        </section>
    )
}


export default TodoList