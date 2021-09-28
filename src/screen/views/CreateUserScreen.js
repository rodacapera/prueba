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

import firebase from '../../database/firebase';

// import {collection, query, where} from 'firebase/firestore';

export default function CreateUserScreen() {
  const [state, setState] = useState({
    name: '',
    lastName: '',
    address: '',
    city: '',
    latitude: '',
    longitude: '',
    stateGeo: '',
  });

  const handleChangeText = (name, value) => {
    setState({...state, [name]: value});
  };

  const addNewUser = async () => {
    console.log('state', state);
    const res = firebase.db.collection('users').add({
      name: state.name,
      lastName: state.lastName,
      address: state.address,
      city: state.city,
      latitude: state.latitude,
      longitude: state.longitude,
      stateGeo: state.stateGeo,
    });
    console.log('scsccssscscs', res);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text>Nombres</Text>
            <TextInput
              placeholder="Name user"
              style={styles.textInput}
              onChangeText={value => handleChangeText('name', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Apellidos</Text>
            <TextInput
              placeholder="LastName user"
              style={styles.textInput}
              onChangeText={value => handleChangeText('lastName', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Direccion</Text>
            <TextInput
              placeholder="Address"
              style={styles.textInput}
              onChangeText={value => handleChangeText('address', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ciudad</Text>
            <TextInput
              placeholder="City"
              style={styles.textInput}
              onChangeText={value => handleChangeText('city', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Latitud</Text>
            <TextInput
              placeholder="Latitude"
              style={styles.textInput}
              onChangeText={value => handleChangeText('latitude', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Longitud</Text>
            <TextInput
              placeholder="Longitude"
              style={styles.textInput}
              onChangeText={value => handleChangeText('longitude', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Estado de Geolocalización</Text>
            <TextInput
              placeholder="State Geo"
              style={styles.textInput}
              onChangeText={value => handleChangeText('stateGeo', value)}
            />
          </View>
        </View>
        <View>
          {/* <Button title="Save user" color="#841584" /> */}
          <TouchableOpacity style={styles.buttonDefault} onPress={addNewUser}>
            <Text style={styles.textButton}>Press Here</Text>
          </TouchableOpacity>
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
