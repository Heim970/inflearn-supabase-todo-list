"use client";

import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "component/todo";
import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: () => getTodos({ searchInput }),
  });

  const createdTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <Button
        onClick={() => createdTodoMutation.mutate()}
        loading={createdTodoMutation.isPending}
      >
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
