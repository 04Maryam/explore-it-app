// screens/ContactsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data);
      } else {
        Alert.alert(
          "Permission Denied",
          "You need to grant permission to access contacts."
        );
      }
    };

    fetchContacts();
  }, []);

  const handleContactPress = (contact) => {
    Alert.alert(
      "Contact Details",
      `Name: ${contact.name}\nPhone: ${
        contact.phoneNumbers ? contact.phoneNumbers[0].number : "N/A"
      }`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contact}
            onPress={() => handleContactPress(item)}
          >
            <View style={styles.contactRow}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.phoneNumbers && (
                <Text style={styles.contactPhone}>
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  contact: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  contactRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1, 
  },
  contactPhone: {
    fontSize: 16,
    color: "#777",
    marginLeft: 10, 
  },
});
