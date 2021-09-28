import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ListItem, Avatar} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

export default function UserList(props) {
  const [users, seTusers] = useState([]);
  const handleGetUsers = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        const myUsers = [];
        querySnapshot.forEach(doc => {
          // console.log('User ID: ', doc.id, doc.data());
          const {name, lastName, city, address, latitude, longitude, stateGeo} =
            doc.data();
          myUsers.push({
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
        seTusers(myUsers);
      });
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        bottomDivider
        Component={TouchableScale}
        onPress={() =>
          props.navigation.navigate('CreateUserScreen', {data: item})
        }>
        <Avatar
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.lastName}</ListItem.Subtitle>
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>Estado: {item.stateGeo}</Text>
          </View>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem>
    );
  };

  useEffect(() => {
    handleGetUsers();
    // console.log(users);
  }, []);
  return (
    <View>
      <View style={styles.formContainer}>
        {users.length > 0 && (
          <FlatList
            keyExtractor={item => item.id}
            data={users}
            renderItem={renderItem}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonDefault}
          onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.textButton}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
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
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    color: 'grey',
  },
});
