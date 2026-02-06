import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [bevlista, setbevlista] = useState([]);
  const [text, setText] = useState('');

  const addItem = () => {
    if (!text.trim()) return;

    setbevlista(prev => [
      ...prev,
      { id: Date.now().toString(), text, done: false },
    ]);
    setText('');
  };

  const toggleList = id => {
    setbevlista(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteList = id => {
    setbevlista(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => setbevlista([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bevásárlólista</Text>
      <Text style={styles.counter}>
        Termékek: {bevlista.filter(t => !t.done).length}
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Új Termék..."
          style={styles.input}
        />
        <Pressable
          onPress={addItem}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {bevlista.length > 0 && (
        <Pressable
          onPress={clearAll}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.clearButtonText}>Összes termék törlése</Text>
        </Pressable>
      )}

      <FlatList
        data={bevlista}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <Pressable
              onPress={() => toggleList(item.id)}
              style={[
                styles.checkbox,
                item.done && styles.checkboxDone,
              ]}
            >
              {item.done && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </Pressable>

            <Text
              style={[
                styles.todoText,
                item.done && styles.todoTextDone,
              ]}
            >
              {item.text}
            </Text>

            <Pressable onPress={() => deleteList(item.id)}>
              <Text style={styles.deleteIcon}>🗑</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}





const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  counter: { color: '#444', marginBottom: 12 },

  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ffcd29ff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#ffd829ff',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  clearButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#d1ff29ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  clearButtonText: { color: '#0c1516ff', fontWeight: '700' },

  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#ffcd29ff',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  checkboxFocused: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },

  checkboxDone: {
    backgroundColor: '#29ff29ff',
  },

  checkmark: { color: '#fff', fontWeight: '800' },

  todoText: { flex: 1, fontSize: 16 },
  todoTextDone: { textDecorationLine: 'line-through', color: '#999' },

  deleteIcon: { fontSize: 18, color: '#E53935', paddingHorizontal: 6 },

  pressed: { opacity: 0.7 },
});
