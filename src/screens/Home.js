import React from "react";
import { View, Linking } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
  
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Perfil Estático"
              onPress={() => {
                navigation.navigate("ProfileEstatico");
              }}
              style={{
                marginTop: 30,
              }}
            />
            <Button
              status="danger"
              text="Sair"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 30,
              }}
            />
           
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
