import React ,{useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Todos from './Todos';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  return (
    <View style={styles.container}>
    <Todos onAddTodo={handleAddTodo} />
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <View style={styles.todoItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.about}>{item.about}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoItem: {
    borderWidth: 1,
    borderColor: 'FF8303',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  about: {
    fontSize: 14,
  },
});

export default Home;
