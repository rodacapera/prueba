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
import {ListItem, Avatar} from 'react-native-elements';

export default function UserList(props) {
  const [users, seTusers] = useState([]);
  const handleGetUsers = async () => {
    console.log('getusers');
    const users = await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          console.log('User ID: ', doc.id, doc.data());
          const {name, lastName, city, address, latitude, longitude, stateGeo} =
            doc.data();
          users.push({
            id: doc.id,
            name,
            lastName,
            city,
            address,
            latitude,
            longitude,
            stateGeo,
          });
        });
        seTusers(users);
      });
  };
  useEffect(() => {
    console.log('dsf');
    handleGetUsers();
    // console.log(users);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text>User list</Text>
          {users.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonDefault}
            onPress={() => props.navigation.navigate('CrateUserScreen')}>
            <Text style={styles.textButton}>Save user</Text>
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
