import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraView } from "expo-camera"; 
// import * as CameraModule from "expo-camera";
// const Camera = CameraModule.Camera;



// import * as CameraModule from "expo-camera";

// const Camera = CameraModule.Camera;


export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  console.log("CameraScreen rendered", Camera);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
