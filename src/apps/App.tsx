import React, { useState } from "react";
import "../styles/App.css";
import Header from "../components/Header";
import { v4 as uuid } from "uuid";
import { Button, Input } from "antd";
import { ListCard } from "../components/List";

export interface TodoInterface {
  id: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [description, setDesciption] = useState<string>("");
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  const onSubmit = () => {
    const todo: TodoInterface = {
      description: description,
      isDone: false,
      id: uuid(),
    };

    setTodos([...todos, todo]);
  };

  const appView = (
    <div>
      <Header />
      <Input
        onChange={(e) => {
          const val = e.target.value;
          setDesciption(val);
        }}
      />
      <div style={{display: "flex", justifyContent: "center", margin: 10}}>
        <Button
          type="primary"
          onClick={() => {
            onSubmit();
          }}
        >
          Add
        </Button>
      </div>
      <ListCard
        todos={todos}
        deleteCallback={(todo) => {
          setTodos(todo);
        }}
        editCallback={(todo) => {
          setTodos(todo);
        }}
      />
    </div>
  );
  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      {appView}
    </div>
  );
}

export default App;
