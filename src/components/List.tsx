import { Button, Checkbox, Divider, List } from "antd";
import { FC, Fragment } from "react";
import { TodoInterface } from "../apps/App";

type CallbackData = (data: TodoInterface[]) => void;

export interface ListCardProps {
  todos: TodoInterface[];
  deleteCallback: CallbackData;
  editCallback: CallbackData;
}

export const ListCard: FC<ListCardProps> = (props) => {
  return (
    <div>
     <Divider orientation="left">List</Divider>
      <List
        bordered
        dataSource={props.todos}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <Checkbox
                  onChange={(e) => {
                    const value = e.target.checked;

                    const editedTool = props.todos.map((t) => {
                      if (t.id === item.id) {
                        return { ...t, isDone: value };
                      }
                      return { ...t };
                    });
                    props.editCallback(editedTool);
                  }}
                  checked={item.isDone}
                />,

                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    const dataWithDelete = props.todos.filter(
                      (oldTodo) => oldTodo.id !== item.id
                    );
                    props.deleteCallback(dataWithDelete);
                  }}
                >
                  Delete
                </Button>,
              ]}
            >
              <span
                style={{
                  textDecoration: item.isDone ? "line-through" : "none",
                }}
              >
                {item.description}
              </span>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
