import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';

export default function Home(props) {
  // const markers =
  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      {/* {this.state.markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))} */}
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttonDefault}
          onPress={() => props.navigation.navigate('UserList')}>
          <Text style={styles.textButton}>Go to List Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDefault}
          onPress={() => props.navigation.navigate('CreateUserScreen')}>
          <Text style={styles.textButton}>Create new user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerMap: {
    backgroundColor: 'red',
    position: 'relative',
    height: 400,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDefault: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#1E86CC',
    padding: 10,
    borderRadius: 8,
    margin: 15,
  },
  textButton: {
    color: 'white',
  },
});
