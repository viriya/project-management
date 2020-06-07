export default function (tasks) {
  let completed = 0;
  tasks.forEach((t) => {
    if (t.completed) completed++;
  });
  const result = Math.round((completed / tasks.length) * 100);
  return result;
}
