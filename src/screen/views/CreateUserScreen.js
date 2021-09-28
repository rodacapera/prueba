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
  const {data} = props.route.params ? props.route.params : '';

  const handleChangeText = (name, value) => {
    console.log(value);
    setState({...state, [name]: value});
  };

  const handleAddNewUser = async () => {
    console.log('state', state);
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
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const handleEditUser = id => {
    console.log('edit user id:', id);
    console.log(state);
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
      })
      .then(() => {
        console.log('User modified!');
      });
  };

  // const handleInsertUserData = () => {
  //   console.log('cascsc');
  // }
  useEffect(() => {
    console.log('uuuuu', props);
    // console.log('data', props.params.data);
    // data && handleInsertUserData();
    // console.log(data);
    setState(data);
  }, [data, props]);

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
        <View>
          <TouchableOpacity
            style={styles.buttonDefault}
            onPress={data ? () => handleEditUser(data.id) : handleAddNewUser}>
            <Text style={styles.textButton}>
              {data ? 'Edit user' : 'Save user'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title="List users"
            color="#000"
            onPress={() =>
              props.navigation.navigate('UserList', {
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
