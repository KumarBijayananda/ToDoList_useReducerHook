#To-Do List Application

##Overview

This is a simple To-Do List application built using React. The app allows users to add, edit, complete, and delete tasks efficiently with the use of the useReducer hook for state management.

##Features

Add Tasks: Users can add new to-do items.

Edit Tasks: Items can be edited in-place.

Mark as Complete: Tasks can be marked as completed via a checkbox.

Delete Tasks: Completed tasks can be deleted.

Cancel Edit: Users can cancel an edit operation before saving.

##Technologies Used

React: A JavaScript library for building user interfaces, used for managing component-based UI.

JavaScript (ES6+): The core programming language used for building the functionality of the application.

CSS: Used for styling the application and improving user experience.

useReducer Hook: A React hook used to manage complex state logic in the to-do list.

##Approach Taken

The application follows a structured approach to state management using the useReducer hook. Instead of using multiple state variables, useReducer is implemented to handle various actions such as adding, editing, deleting, and toggling tasks. This keeps the state predictable and scalable.

The UI is kept minimal and interactive, allowing users to quickly add and manage tasks without unnecessary complexity. Each action dispatches an event, updating the state accordingly to maintain a smooth user experience.

##Usage

Type a task in the input field and press the Add button to create a new to-do item.

Click on a task's checkbox to mark it as completed.

Click Edit to modify a task and Save to confirm changes.

Click Delete to remove a completed task.

Click Cancel to exit edit mode without saving.

##Code Structure

App.js: Main component that manages the to-do list state and rendering.

useReducer is used for handling different actions like add, edit, delete, etc.

Basic CSS is applied for styling.