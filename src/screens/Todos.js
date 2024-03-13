import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import CustomInput from '../components/CustomInput';

const CustomDialog = ({visible, onClose, onDelete}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.deleteModalView}>
        <View
          style={[
            styles.deleteContainer,
            {borderTopWidth: 3, borderTopColor: '#FF8303'},
          ]}>
          <Text style={styles.modalText}>Delete this tasks ?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onDelete}
              style={[styles.actionButton, styles.updateButton]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.actionButton, styles.updateButton]}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisibleUpdate, setDialogVisibleUpdate] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); // To keep track of the index to delete
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');

  const handleCreateTodo = () => {
    if (title && about) {
      // Check if both title and about are not empty
      const newTodo = {title, about};
      setTodos([...todos, newTodo]);
      setTitle('');
      setAbout('');
    } else {
      Alert.alert('Please fill in both title and about fields.');
    }
  };

  const handleDeleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(deleteIndex, 1); // Use deleteIndex to delete the correct todo
    setTodos(newTodos);
    setDialogVisible(false);
  };
  const handleOpenMenu = index => {
    setSelectedTodoIndex(index);
    setOpenMenu(!openMenu);
  };

  const handleUpdateTodo = index => {
    setSelectedTodoIndex(index);
    setOpenMenu(!openMenu);
    setUpdatedTitle(todos[index].title);
    setUpdatedAbout(todos[index].about);
    setDialogVisibleUpdate(true);
  };

  const handleSubmitUpdate = (updatedTitle, updatedAbout) => {
    const updatedTodos = [...todos];
    updatedTodos[selectedTodoIndex] = {
      title: updatedTitle,
      about: updatedAbout,
    };
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
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'cover',
            }}
            source={require('../assets/Union.png')}
          />
        </TouchableOpacity>
      </View>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={({item, index}) => (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenMenu(index)}
                style={[
                  styles.todoItem,
                  selectedTodoIndex === index && styles.selectedTodoItem,
                ]}>
                <View style={{width: '90%'}}>
                  <Text style={[styles.content, {fontSize: 25}]}>
                    Title: {item.title}
                  </Text>
                  <Text style={styles.content}>About: {item.about}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteIndex(index); // Set the index to delete
                      setDialogVisible(true);
                    }}
                    style={{}}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                      source={require('../assets/croseicon.png.png')}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {openMenu && selectedTodoIndex === index && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.updateButton]}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'cover',
                        margin: 10,
                      }}
                      source={require('../assets/i.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleUpdateTodo(index);
                      setDialogVisibleUpdate(true);
                    }}
                    style={[styles.actionButton, styles.updateButton]}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'cover',
                        margin: 10,
                      }}
                      source={require('../assets/Edit.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.todoList}
        />
      ) : (
        <View style={styles.noTasksContainer}>
          <View style={styles.border}></View>
          <Text style={styles.noTasksText}>No tasks</Text>
          <View style={styles.border}></View>
        </View>
      )}
      <CustomDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onDelete={handleDeleteTodo}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisibleUpdate}
        onRequestClose={() => {
          setDialogVisibleUpdate(!dialogVisibleUpdate);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomInput
              placeholder="Updated Title"
              onChangeText={setUpdatedTitle}
              value={updatedTitle}
            />
            <CustomInput
              placeholder="Updated About"
              onChangeText={setUpdatedAbout}
              value={updatedAbout}
              multiline={true}
              numberOfLines={4} // Adjust the number of lines as needed
              style={styles.textArea} // Apply additional styles for text area if necessary
            />

            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
              <TouchableOpacity
                onPress={() => {
                  handleSubmitUpdate(updatedTitle, updatedAbout);
                  setDialogVisibleUpdate(!dialogVisibleUpdate);
                }}
                style={[styles.actionButton, styles.updateButton]}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDialogVisibleUpdate(!dialogVisibleUpdate)}
                style={[styles.actionButton, styles.updateButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: '100%',
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selectedTodoItem: {
    backgroundColor: '#FF8303',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    width: '100%',
    height: 'auto',
  },
  actionButton: {
    borderColor: '#FF8303',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    borderColor: '#FF8303',
    borderWidth: 2,
    padding: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 24,
    color: '#F0E3CA',
  },
  content: {
    color: '#F0E3CA',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F0E3CA',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#F0E3CA',
    textAlign: 'center',
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
    color: '#F0E3CA',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#1B1A17',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#FF8303',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButton: {
    borderRadius: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  deleteModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  deleteContainer: {
    margin: 20,
    backgroundColor: '#',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: '#FF8303',
    width: 100,
    marginBottom: 10,
  },
  noTasksText: {
    color: '#F0E3CA',
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10, // Adjust vertical padding as needed
    height: 100, // Adjust the height as needed
  },
});
