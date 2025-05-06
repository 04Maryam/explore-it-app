import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Location:</Text>
      {/* <Text>
        {location
          ? JSON.stringify(location.coords, null, 2)
          : errorMsg || "Loading..."}
      </Text> */}
      {location ? (
        <>
        <Text>
        {JSON.stringify(location.coords, null, 2)}
      </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude || 0,
            longitude: location.coords.longitude || 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={location.coords} title="You are here" />
        </MapView>
        </>
      ) : (
        <Text>{errorMsg || "Loading..."}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
});
