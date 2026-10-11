# Title
Task Manager

# Description
Allow users to manager tasks among a week, or other periods of time. For example, while I am developing Project-JnJ, I manaully manage a note which contains a few questions/tasks that I want to do later, maybe next Monday. I may answer a few of those questions, or delete from the list. The requirement is I can utilise Moonlight to create/add one item into a to-do list, I can retrieve a list. I can answer a question in the list. I can delete one item from the list - either marked as done, or not need anymore.

# Existing Tags

- ###task-manager-monday###

# Use Cases

## 1. Adding tasks

- 1. Users enter a prompt into the Ask Camphor, e.g. Add "xxx" into next Monday task list [for a project/tag] (optional).
- 2. The server recieves the request and add to corresponding list.


## 2. Retrieving tasks

- 1. Users enter a prompt into the Ask Camphor, e.g. Today's task.
- 2. The server returns the todo list for today.

## 3. Working on tasks

- 1. Once a task list retrieved, users pick up one, and add a comment/answer for it
- 2. The server saves the comment/answer
- 3. Users Marked a task as done/non-needed
- 4. The server saves the feedback.

## 4. Server aware of the knowledge of any previous tasks/answers

- 1. Users enter a prompt into the Ask Camphor, e.g. did I have a note for comparing results of ai models Cloude vs gpt? What did I say?
- 2. The server checks on the saved tasks/feedback, and found a feedback - well maybe, still need more info
- 3. The server returns with the found results
- 4. Users add more feedback, e.g. Cloude is more for coding purpose, so for a complex project, it might be more able to understand what is the users real requests, while gpt is more for general purpose, so it might think more boardly and provide a diff answer.
- 5. The server add the new feedback under the task
