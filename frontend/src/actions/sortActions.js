// frontend/src/actions/sortActions.js
export const sortTasksByCreateDate = (tasks, sortOrder) => {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.createDate);
    const dateB = new Date(b.createDate);

    if (sortOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};



