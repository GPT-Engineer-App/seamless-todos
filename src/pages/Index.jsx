import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (task) => {
    setSelectedTask(task);
  };

  const saveTaskDetails = () => {
    setTasks(tasks.map(task => task.id === selectedTask.id ? selectedTask : task));
    setSelectedTask(null);
  };

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
      </header>
      <div className="mb-4">
        <Input
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} className="ml-2">Add</Button>
      </div>
      <div>
        {tasks.map(task => (
          <Card key={task.id} className="mb-2">
            <CardHeader>
              <div className="flex items-center">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                <CardTitle className={`ml-2 ${task.completed ? "line-through" : ""}`}>{task.name}</CardTitle>
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => editTask(task)}>Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteTask(task.id)}>Delete</Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  value={selectedTask.name}
                  onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea
                  id="taskDescription"
                  value={selectedTask.description || ""}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="taskDueDate">Due Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedTask.dueDate}
                  onSelect={(date) => setSelectedTask({ ...selectedTask, dueDate: date })}
                />
              </div>
              <div>
                <Label htmlFor="taskPriority">Priority</Label>
                <Select
                  value={selectedTask.priority || "normal"}
                  onValueChange={(value) => setSelectedTask({ ...selectedTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedTask(null)}>Cancel</Button>
                <Button onClick={saveTaskDetails}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;