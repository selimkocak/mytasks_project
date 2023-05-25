// frontend/src/actions/sortActions.js
export const sortTasksByCreateDate = (tasks, sortOrder, column) => {

  return tasks
    .filter((task) => task.column === column)
    .sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
};