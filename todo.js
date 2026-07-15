document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const inputError = document.getElementById('input-error');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const todoSummary = document.getElementById('todo-summary');
    const taskCount = document.getElementById('task-count');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // In-memory Task State Array (No LocalStorage yet, to be added in Phase 4)
    let tasks = [];

    // ==========================================
    // Event Listeners
    // ==========================================

    // Handle form submit (Add new task)
    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const taskText = todoInput.value.trim();
            
            // Validation
            if (!taskText) {
                inputError.style.display = 'block';
                todoInput.classList.add('invalid-input');
                return;
            }
            
            // Clear errors
            inputError.style.display = 'none';
            todoInput.classList.remove('invalid-input');
            
            // Add Task to State
            addTask(taskText);
            
            // Reset input field focus
            todoInput.value = '';
            todoInput.focus();
        });
    }

    // Input listening to clear errors on keypress
    if (todoInput) {
        todoInput.addEventListener('input', () => {
            if (todoInput.value.trim()) {
                inputError.style.display = 'none';
                todoInput.classList.remove('invalid-input');
            }
        });
    }

    // Clear all tasks
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            tasks = [];
            renderTasks();
        });
    }

    // ==========================================
    // Task State Handlers
    // ==========================================

    // Add task object to state
    function addTask(text) {
        const newTask = {
            id: Date.now(), // Generate a simple unique ID
            text: text,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    // Delete task by ID
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    // Toggle task completed state by ID
    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    }

    // ==========================================
    // UI Rendering Logic
    // ==========================================
    function renderTasks() {
        // 1. Clear existing list items in DOM
        todoList.innerHTML = '';
        
        // 2. Check empty state visibility
        if (tasks.length === 0) {
            emptyState.style.display = 'flex';
            todoSummary.style.display = 'none';
            return;
        } else {
            emptyState.style.display = 'none';
            todoSummary.style.display = 'flex';
        }
        
        // 3. Count incomplete tasks
        const pendingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = pendingTasks;
        
        // 4. Generate DOM elements dynamically
        tasks.forEach(task => {
            // Main list item wrapper
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'checked' : ''}`;
            
            // Left content (checkbox + task text)
            const itemContent = document.createElement('div');
            itemContent.className = 'todo-item-content';
            
            // Custom checkbox element
            const checkbox = document.createElement('div');
            checkbox.className = 'todo-checkbox';
            
            // Task text label
            const textSpan = document.createElement('span');
            textSpan.className = 'todo-text';
            textSpan.textContent = task.text;
            
            // Assemble left content layout
            itemContent.appendChild(checkbox);
            itemContent.appendChild(textSpan);
            
            // Right content (Delete button)
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
            
            // Add click listeners directly
            itemContent.addEventListener('click', () => toggleTask(task.id));
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop click from toggling completion status
                deleteTask(task.id);
            });
            
            // Assemble main wrapper
            li.appendChild(itemContent);
            li.appendChild(deleteBtn);
            
            // Append to unordered list container
            todoList.appendChild(li);
        });
    }

    // Initial render call on load
    renderTasks();
});
