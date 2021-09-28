import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function CreateUserScreen(props) {
  const [state, setState] = useState({
    name: '',
    lastName: '',
    address: '',
    city: '',
    latitude: '',
    longitude: '',
    stateGeo: '',
  });
  const {data} = props.route.params ? props.route.params : false;
  const [textError, setTextError] = useState(false);
  const handleChangeText = (name, value) => {
    setState({...state, [name]: value});
    setTextError(false);
  };

  const handleAddNewUser = async () => {
    console.log('state', state);
    if (
      state.name &&
      state.lastName &&
      state.city &&
      state.latitude &&
      state.longitude &&
      state.stateGeo
    ) {
      firestore()
        .collection('users')
        .add({
          name: state.name,
          lastName: state.lastName,
          address: state.address,
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          stateGeo: state.stateGeo,
          state: 'Activo',
        })
        .then(() => {
          console.log('User added!');
          props.navigation.navigate('UserList');
        });
    } else {
      console.log('incompleto');
      setTextError(true);
    }
  };

  const handleEditUser = (id, inactive) => {
    console.log('edit user id:', id);
    firestore()
      .collection('users')
      .doc(id)
      .update({
        name: state.name,
        lastName: state.lastName,
        address: state.address,
        city: state.city,
        latitude: state.latitude,
        longitude: state.longitude,
        stateGeo: state.stateGeo,
        state: inactive ? inactive : 'Activo',
      })
      .then(() => {
        console.log('User modified!');
        props.navigation.navigate('UserList');
      });
  };
  const handleDeleteUser = id => {
    handleEditUser(id, 'Inactivo');
    console.log('edit user id:', id);
    console.log(state);
    firestore()
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        props.navigation.navigate('UserList');
      });
  };

  // const handleInsertUserData = () => {
  //   console.log('cascsc');
  // }
  useEffect(() => {
    // console.log('uuuuu', props);
    // console.log('data', props.params.data);
    // data && handleInsertUserData();
    // console.log('data', data);
    data
      ? setState(data)
      : setState({
          name: '',
          lastName: '',
          address: '',
          city: '',
          latitude: '',
          longitude: '',
          stateGeo: '',
        });
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text>Nombres</Text>
            <TextInput
              value={state.name}
              placeholder="Name user"
              style={styles.textInput}
              onChangeText={value => handleChangeText('name', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Apellidos</Text>
            <TextInput
              value={state.lastName}
              placeholder="LastName user"
              style={styles.textInput}
              onChangeText={value => handleChangeText('lastName', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Direccion</Text>
            <TextInput
              value={state.address}
              placeholder="Address"
              style={styles.textInput}
              onChangeText={value => handleChangeText('address', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ciudad</Text>
            <TextInput
              value={state.city}
              placeholder="City"
              style={styles.textInput}
              onChangeText={value => handleChangeText('city', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Latitud</Text>
            <TextInput
              value={state.latitude}
              placeholder="Latitude"
              style={styles.textInput}
              onChangeText={value => handleChangeText('latitude', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Longitud</Text>
            <TextInput
              value={state.longitude}
              placeholder="Longitude"
              style={styles.textInput}
              onChangeText={value => handleChangeText('longitude', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Estado de Geolocalización</Text>
            <TextInput
              value={state.stateGeo}
              placeholder="State Geo"
              style={styles.textInput}
              onChangeText={value => handleChangeText('stateGeo', value)}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textError}>
            {textError && 'Todos los campos son obligatorios'}
          </Text>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.buttonDefault}
            onPress={data ? () => handleEditUser(data.id) : handleAddNewUser}>
            <Text style={styles.textButton}>
              {data ? 'Edit user' : 'Save user'}
            </Text>
          </TouchableOpacity>
          {data && (
            <TouchableOpacity
              style={styles.buttonDefault}
              onPress={() => handleDeleteUser(data.id)}>
              <Text style={styles.textButton}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Button
            title={data ? 'Go to Home' : 'List users'}
            color="#000"
            onPress={() =>
              props.navigation.navigate(data ? 'Home' : 'UserList', {
                names: ['Brent', 'Satya', 'Michaś'],
              })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    paddingLeft: 20,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'flex-start',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonDefault: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#1E86CC',
    padding: 10,
    borderRadius: 8,
    margin: 15,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 320,
    marginTop: 5,
    color: '#868788',
  },
  textButton: {
    color: 'white',
  },
});
