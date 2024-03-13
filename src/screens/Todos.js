import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal , Image, FlatList} from 'react-native';
import CustomInput from '../components/CustomInput';

const CustomDialog = ({ visible, onClose, onDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); // To keep track of the index to delete
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');
  const handleCreateTodo = () => {
    const newTodo = { title, about };
    setTodos([...todos, newTodo]);
    setTitle("");
    setAbout("");
  };

  const handleDeleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(deleteIndex, 1); // Use deleteIndex to delete the correct todo
    setTodos(newTodos);
    setDialogVisible(false);
  };
  const handleOpenMenu = (index) => {
    setSelectedTodoIndex(index);
    setOpenMenu(!openMenu);
  };

  
  const handleUpdateTodo = (index) => {
    setSelectedTodoIndex(index);
    setOpenMenu(!openMenu);
    // Open the dialog when updating a todo item
    setUpdatedTitle(todos[index].title);
    setUpdatedAbout(todos[index].about);
    setDialogVisible(true);
  };

  const handleSubmitUpdate = (updatedTitle, updatedAbout) => {
    const updatedTodos = [...todos];
    updatedTodos[selectedTodoIndex] = { title: updatedTitle, about: updatedAbout };
    setTodos(updatedTodos);
  };


  return (
    <>
      <View style={styles.container}>
        <View>
          <CustomInput
            placeholder="Title"
            onChangeText={setTitle}
            value={title}
          />
          <CustomInput
            placeholder="About"
            onChangeText={setAbout}
            value={about}
          />
        </View>
        <TouchableOpacity onPress={handleCreateTodo} style={styles.addButton}>
          <Text style={{}}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: 'cover',
              }}
              source={require('../assets/Union.png')}
            />
          </Text>
        </TouchableOpacity>
      </View>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenMenu(index)}
                style={[
                  styles.todoItem,
                  selectedTodoIndex === index && styles.selectedTodoItem,
                ]}
              >
                <View style={{ width: '90%' }}>
                  <Text style={styles.content}>Title: {item.title}</Text>
                  <Text style={styles.content}>About: {item.about}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteIndex(index); // Set the index to delete
                      setDialogVisible(true);
                    }}
                    style={{}}
                  >
                    <Text style={{}}>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                        }}
                        source={require('../assets/croseicon.png.png')}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {openMenu && selectedTodoIndex === index && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleUpdateTodo(index)} style={styles.actionButton}>
                    <Text style={{}}>🖊</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("click for warning")} style={styles.actionButton}>
                    <Text style={{}}>💻</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.todoList}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ borderWidth: 2, width: 100, borderColor: "#FF8303" }}></Text>
          <Text style={{ color: "#F0E3CA" }}>No tasks</Text>
          <Text style={{ borderWidth: 2, width: 100, borderColor: "#FF8303" }}></Text>
        </View>
      )}
      <CustomDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onDelete={handleDeleteTodo}
      />

    </>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'space-between',
    width: '100%'
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    borderWidth: 1,
    borderColor: "#FF8303",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  selectedTodoItem: {
    backgroundColor: '#FF8303',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    width: '100%',
    height: 'auto'
  },
  actionButton: {
    borderColor: "#FF8303",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    borderColor: "#FF8303",
    borderWidth: 2,
    padding: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 24,
    color: "#F0E3CA",
  },
  content: {
    color: "#F0E3CA"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
