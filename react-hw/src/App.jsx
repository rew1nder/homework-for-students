/*
Отримання та відображення завдання з API:
Редагувати App компонент, 
який виконує запит до API https://jsonplaceholder.typicode.com/todos/1
і відображає дані завдання.

Вимоги:
- Використати useEffect для виконання запиту при першому рендері компонента.
- Створити три стани за допомогою useState:
    - task — для збереження отриманого завдання;
    - error — для обробки помилок при запиті;
    - loading — для індикації завантаження даних.
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - інформацію про завдання, коли task успішно отриманий.
- Використати fetch для запиту до API.
*/
// ...existing code...
import React from 'react'
import './App.css'

function App() {
  const [task, setTask] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const didFetchRef = React.useRef(false);

  React.useEffect(() => {
    const controller = new AbortController();

    const fetchTask = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTask(data);
        didFetchRef.current = true; 
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (!didFetchRef.current) fetchTask();
    return () => controller.abort();
  }, []);

  return (
    <div className='container'>
      <h1>React Homework</h1>

      {loading && <p>Завантаження...</p>}

      {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}

      {task && (
        <div className='task'>
          <h2>{task.title}</h2>
          <p><strong>Id:</strong> {task.id}</p>
          <p><strong>UserId:</strong> {task.userId}</p>
          <p><strong>Completed:</strong> {task.completed ? 'Так' : 'Ні'}</p>
        </div>
      )}
    </div>
  )
}

export default App;
