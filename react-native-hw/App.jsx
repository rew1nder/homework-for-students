/*
Динамічне отримання та відображення списку завдань:
Напишіть код прямо у Expo Snack (https://snack.expo.dev/) 
та після перевірки вставте результат у ваш поточний файл.

Вимоги:
- Використати React Native компоненти:
    - TextInput для введення числа — кількості завдань для запиту;
    - Button для виконання запиту;
    - FlatList для відображення списку завдань.
- Керувати станом за допомогою useState та useEffect:
    - tasks — масив отриманих завдань;
    - error — для обробки помилок.
    - loading — для індикації завантаження;
- При натисканні кнопки робити запит на API https://jsonplaceholder.typicode.com/todos?_limit=<число з TextInput> та оновлювати список tasks.
  Приклад запиту: якщо у TextInput введено 5, URL буде https://jsonplaceholder.typicode.com/todos?_limit=5
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - список завдань через FlatList, показуючи title кожного елемента.
*/

import React from 'react'
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 8, borderRadius: 4 },
  center: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }
})

export default function App() {
  const [count, setCount] = React.useState('5')
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const fetchTasks = async () => {
    const limit = parseInt(count, 10)
    if (isNaN(limit) || limit <= 0) {
      setError('Введіть додатнє число')
      setTasks([])
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Помилка при завантаженні')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Отримати список завдань</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={count}
          onChangeText={setCount}
          keyboardType="numeric"
          placeholder="Кількість"
        />
        <Button title="Завантажити" onPress={fetchTasks} />
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" />
          <Text>Завантаження...</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>Помилка: {error}</Text> : null}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        ListEmptyComponent={!loading && !error ? <Text>Немає завдань</Text> : null}
      />
    </View>
  )
}

