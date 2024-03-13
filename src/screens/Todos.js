import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import CustomInput from '../components/CustomInput';

const CustomDialog = ({visible, onClose, onDelete}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{backgroundColor:'red'}}>
        <View style={{}}>
          <Text style={{}}>Delete this tasks ?</Text>
          <View style={{}}>
            <TouchableOpacity onPress={onDelete} style={{}}>
              <Text style={{}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={{}}>
              <Text style={{}}>Cancel</Text>
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
    const newTodo = {title, about};
    setTodos([...todos, newTodo]);
    setTitle('');
    setAbout('');
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
          renderItem={({item, index}) => (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenMenu(index)}
                style={[
                  styles.todoItem,
                  selectedTodoIndex === index && styles.selectedTodoItem,
                ]}>
                <View style={{width: '90%'}}>
                  <Text style={styles.content}>Title: {item.title}</Text>
                  <Text style={styles.content}>About: {item.about}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteIndex(index); // Set the index to delete
                      setDialogVisible(true);
                    }}
                    style={{}}>
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
                  <TouchableOpacity
                    onPress={() => {
                      handleUpdateTodo(index);
                      setDialogVisibleUpdate(true);
                    }}
                    style={styles.actionButton}>
                    <Text style={{margin: 10}}>🖊</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log('click for warning')}
                    style={styles.actionButton}>
                    <Text style={{margin: 10}}>💻</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.todoList}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{borderWidth: 2, width: 100, borderColor: '#FF8303'}}></Text>
          <Text style={{color: '#F0E3CA'}}>No tasks</Text>
          <Text
            style={{borderWidth: 2, width: 100, borderColor: '#FF8303'}}></Text>
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
            <Text style={styles.modalText}>Update Todo</Text>
            <CustomInput
              placeholder="Updated Title"
              onChangeText={setUpdatedTitle}
              value={updatedTitle}
            />
            <CustomInput
              placeholder="Updated About"
              onChangeText={setUpdatedAbout}
              value={updatedAbout}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  handleSubmitUpdate(updatedTitle, updatedAbout);
                  setDialogVisibleUpdate(!dialogVisibleUpdate);
                }}
                style={[styles.actionButton, styles.updateButton]}>
                <Text style={styles.buttonText}>Update</Text>
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#1B1A17',
    marginLeft: 10,
    borderWidth:2,
    borderColor:"#FF8303"
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
});
