"use client";

import Todo from "component/todo";
import { Button, Input } from "node_modules/@material-tailwind/react";

export default function UI() {
  return (
    <div className="w-2/3 mx-auto flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
      />

      <Todo />
      <Button>
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
