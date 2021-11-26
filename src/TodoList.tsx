import * as React from "react";
import { context } from "./Provider";
import { motion, AnimatePresence } from "framer-motion";

const { useContext } = React;

export default function TodoList() {
  const { state, dispatch } = useContext(context);

  function handleDelete(todo: any) {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }

  function handleCheckboxClick(todo: any) {
    dispatch({ type: "TOGGLE_TODO_COMPLETED", payload: todo });
  }

  if (!state.todos) {
    return <div />;
  }
let todo: any
  return (
    <>
      <ul className="todo-list">
        {state.todos.map((todo: any) => {
          return (
            <AnimatePresence exitBeforeEnter>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="todo-list__item"
                key={todo.id}
              >
                <span onClick={() => handleCheckboxClick(todo)}>
                  {todo.completed ? (
                    <span className="todo-list__item__completed" />
                  ) : (
                    <span className="todo-list__item__not-completed" />
                  )}
                </span>
                {todo.text}
                <span
                  className="todo-list__item__delete-button"
                  onClick={() => handleDelete(todo)}
                >
                  X
                </span>
              </motion.li>
            </AnimatePresence>
          );
        })}
      </ul>
    </>
  );
}
