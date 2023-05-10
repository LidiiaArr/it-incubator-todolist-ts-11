import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {Task1} from "./Task11";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo(({
                                        id,
                                        title,
                                        tasks,
                                        removeTask,
                                        changeFilter,
                                        addTask,
                                        changeTaskStatus,
                                        removeTodolist,
                                        changeTodolistTitle,
                                        filter,
                                        changeTaskTitle
                                    }: PropsType) => {
    const addTask1 = useCallback((title: string) => {
        addTask(title, id);
    }, [id, addTask])

    const removeTodolist1 = () => {
        removeTodolist(id);
    }
    const changeTodolistTitle1 = useCallback((title: string) => {
        changeTodolistTitle(id, title);
    },[changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [])


    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }


    const removeTask1 = useCallback((taskId: string) => removeTask(taskId, id), [removeTask, id])
    const changeTaskStatus1 = useCallback((taskId: string, status: boolean) => {
        changeTaskStatus(taskId, status, id);
    }, [changeTaskStatus, id])
    const changeTaskTitle1 = useCallback((taskId: string, title: string) => {
        changeTaskTitle(taskId, title, id);
    }, [changeTaskTitle, id])

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle1}/>
            <IconButton onClick={removeTodolist1}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask1}/>
        <div>
            {
                tasksForTodolist.map(t => {

                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask1}
                        changeTaskStatus={changeTaskStatus1}
                        changeTaskTitle={changeTaskTitle1}
                    />
                    // return <Task1
                    //     key={t.id}
                    //     task={t}
                    //     todolistId={id}
                    // />
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


