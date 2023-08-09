package org.example.repository;

import org.example.model.Task;
import java.util.List;

public interface TaskRepository {
    List<Task> findByStatus(String status);
}
