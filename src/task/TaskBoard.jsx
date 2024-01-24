import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";


const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "learn React",
        'description': "I want to learn something",
        'tags': ['web', 'react', 'js'],
        'priority': 'high',
        'isFavourite': true
    }
    const [tasks, setTasks] = useState([defaultTask])
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTastToUpdate]= useState(null);

    const handleAddEditTask=(newTask, isAdd)=>{
        if(isAdd){
            setTasks([...tasks, newTask])
            
        }
        else{
            setTasks(
                tasks.map((task)=>{
                    if(task.id===newTask.id){
                        return newTask;
                    }
                    return task;
                })
            )
        }

        setShowAddModal(false)
        
    }
    const handleEditTask=(task)=>{
        setTastToUpdate(task)
        setShowAddModal(true)
    }

    const handleCloseClick=()=>{
        setShowAddModal(false)
        setTastToUpdate(null)
    }
    const handleDeleteTask=(taskId)=>{
        const tasksAfterDelete = tasks.filter(task=> task.id !== taskId)
        setTasks(tasksAfterDelete)
    }
    const handleDeleteAllClick=()=>{
        tasks.length = 0;
        setTasks([...tasks])
    }
    const handleFavourite=(taskId)=>{
        const taskIndex = tasks.findIndex(task=> task.id === taskId);
        const newTasks = [...tasks];
        newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
        setTasks(newTasks)
    }
    const handleSearch=(searchTerm)=>{
            console.log(searchTerm);
            const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setTasks([...filtered]);
    }
    return (
        <section className="mb-20" id="tasks">
            {
              showAddModal &&  <AddTaskModal 
              onSave={handleAddEditTask}
              onCloseClick={handleCloseClick}
              taskToUpdate={taskToUpdate}
              ></AddTaskModal>
            }
		
		<div className="container">
			
		<div className="p-2 flex justify-end">
			<SearchTask onSearch={handleSearch}></SearchTask>
		</div>
		
			<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
				<TaskActions  onAddClick={()=> setShowAddModal(true)} onDeleteAllClick={handleDeleteAllClick}></TaskActions>
                {
                    tasks.length > 0 ?
                    (
                        <TaskList tasks={tasks} onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onFav={handleFavourite}></TaskList>
                    ): ( <NoTasksFound></NoTasksFound>)
                }
				
			</div>
		</div>
	</section>
    );
};

export default TaskBoard;