package org.example.controller;

import org.example.model.Task;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TaskController {

    private List<Task> tasks = new ArrayList<>();

    public TaskController() {
        tasks.add(new Task(1L, "Task 1", "Description 1", "To Do"));
        tasks.add(new Task(2L, "Task 2", "Description 2", "In Progress"));
        tasks.add(new Task(3L, "Task 3", "Description 3", "Done"));
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("tasksToDo", getTasksByStatus("To Do"));
        model.addAttribute("tasksInProgress", getTasksByStatus("In Progress"));
        model.addAttribute("tasksDone", getTasksByStatus("Done"));
        return "index";
    }

    private List<Task> getTasksByStatus(String status) {
        List<Task> tasksByStatus = new ArrayList<>();
        for (Task task : tasks) {
            if (task.getStatus().equals(status)) {
                tasksByStatus.add(task);
            }
        }
        return tasksByStatus;
    }
}