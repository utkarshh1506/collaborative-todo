import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard"; // or whatever your task component is
import { Draggable } from "@hello-pangea/dnd";

const Column = ({ columnId, title, tasks }) => {
  return (
    <div className="column" style={{width:'300px'}}>
      <h3>{title}</h3>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "200px", // 👈 makes column visible when empty
              padding: "10px",
              background: "#f8f8f8", // 👈 light background to differentiate
              borderRadius: "10px",
              transition: "background 0.2s ease",
            }}
          >
            {tasks.map((task, index) => (
              <Draggable draggableId={task._id} index={index} key={task._id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-card"
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
