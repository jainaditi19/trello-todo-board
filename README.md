# Trello-style Todo Kanban Board (React + Vite + dnd-kit)

A lightweight Kanban-style todo board built using React and [dnd-kit](https://github.com/clauderic/dnd-kit) for modern drag-and-drop support. Tasks can be added, edited, and moved between "Pending", "In Progress", and "Completed" columns.

# Library used - dnd-kit
dnd-kit is a modern, accessible drag-and-drop toolkit for React. It offers flexible, low-level building blocks and better performance compared to older libraries like react-beautiful-dnd.

---

## How to Run the Project Locally

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jainaditi19/kanban-todo-app.git
   cd kanban-todo-app

2. **Install Dependencies**
    npm install
    or
    install dnd-kit using npm install @dnd-kit/core @dnd-kit/sortable

3. **Run the Development Server**
    npm run dev

4. **Open the App in Your Browser or navigate to:**
    http://localhost:5173


# Code Structure
Component-based design using reusable functional components like:

Board: Holds the full Kanban layout

ColumnTab: Individual status column

TodoCard: Draggable task card

useTodos: Custom React hook for managing state

Drag-and-Drop
Implemented with @dnd-kit/core and @dnd-kit/sortable

SortableContext enables drag & drop across and within columns

Smooth and performant drag operations, unlike deprecated alternatives like react-beautiful-dnd

Features
Add, rename, and drag tasks between columns

Tasks are fetched initially from a dummy API (https://dummyjson.com/todos)

Responsive layout using CSS

# Trade-offs
In-memory state only; no persistent storage (e.g., localStorage or backend)

Using a public dummy API for initial task data; might lead to inconsistent states

dnd-kit has a slightly steeper learning curve compared to older libraries

# Potential Improvements
Persist todos using localStorage or backend integration

Add user authentication to store todos per user

Improve accessibility (keyboard drag support)

Add animations on drag/drop using @dnd-kit/animations

Improve mobile responsiveness and UI/UX styling

# Hosted the code using GitHub Pages
https://jainaditi19.github.io/trello-todo-board/

# Link to code repository
https://github.com/jainaditi19/trello-todo-board