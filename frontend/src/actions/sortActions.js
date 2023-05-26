// frontend/src/actions/sortActions.js
export function sortTasksByCreateDate(tasks, order = 'desc') {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.create_date);
    const dateB = new Date(b.create_date);

    if (order === 'desc') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
}




