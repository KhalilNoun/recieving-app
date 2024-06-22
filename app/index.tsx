import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";

import axios from "axios";
import {
  Avatar,
  Button,
  IconElement,
  Icon,
  TopNavigation,
  Input,
} from "@ui-kitten/components";

const AlertIcon = (props): IconElement => (
  <Icon {...props} name="alert-circle-outline" />
);
const Login = (props): IconElement => <Icon {...props} name="arrow-up" />;
export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  // const [response, setResponse] = useState(null);
  const router = useRouter();
  //password eye-off on
  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };
  //validating email with regex
  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
    setEmail(text);
  };

  //validating pass with regex
  const validatePass = (text: string) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    setIsValidPass(passRegex.test(text));
    setPassword(text);
  };
  //handling login
  const handleLogin = async () => {
    if (!isValidEmail && !isValidPass) {
      return Alert.alert("Kindly provide correct credentials");
    }
    if (!isValidPass) {
      return Alert.alert(
        "Passwords must contain a minimum of eight characters "
      );
    }
    if (!isValidEmail) {
      return Alert.alert("Email is invalid");
    }
    if (isValidEmail && isValidPass) {
      try {
        setLoading(true);

        const response = await axios.post("http://192.168.1.6:5000/login", {
          email,
          password,
        });
        //setResponse(response.data);
        //console.log(response);
        setLoading(false);
        if (response.data.id) {
          router.push({
            pathname: "details",
            params: { id: response.data.id },
          });
        } else {
          Alert.alert("id not passed");
        }
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 404:
              setMessage(error.response.data);
              break;
            case 401:
              setMessage(error.response.data);
              break;
            default:
              setMessage("unknown");
          }
        } else {
          setMessage("Network error");
        }
      }
    }
  };
  const renderTitle = (): React.ReactElement => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.avatar}
        source={require("../assets/images/png-transparent-butterflpng.png")}
        size="giant"
        ImageComponent={ImageBackground}
      />
      <Text style={styles.title}>Receiving APP</Text>
    </View>
  );
  useEffect(() => {
    if (!message) return;
    setTimeout(() => {
      setMessage("");
    }, 10000);
  }, [message]);
  return (
    <Background>
      <TopNavigation
        title={renderTitle}
        // alignment="center"
        style={styles.topnavigation}
      />

      <View style={styles.container}>
        <Input
          style={styles.input}
          value={email}
          placeholder="Email ID"
          size="large"
          status={isValidEmail ? "success" : "info"}
          onChangeText={validateEmail}
        />
        <Input
          value={password}
          placeholder="Password"
          style={styles.input}
          size="large"
          status={isValidPass ? "success" : "info"}
          caption={renderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={validatePass}
        />

        <Button
          onPress={handleLogin}
          appearance="outline"
          size="large"
          //status="success"
          disabled={loading}
        >
          Login
        </Button>
        {message ? <Text>{message}</Text> : null}
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  avatar: {
    margin: 8,
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 0,
  },
  topnavigation: {
    backgroundColor: "rgba(51, 102, 255, 0.48)",
    marginTop: 30,
    paddingLeft: 40,
  },
  input: {
    marginBottom: 15,
  },
  link: {
    borderColor: "gold",
  },
  errorInput: {
    borderColor: "red",
  },
  login: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  button: {
    backgroundColor: "#f194ff",
    padding: 10,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: "50%",
  },
  logo: {
    marginHorizontal: -20,
    marginRight: 10,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "serif",
    color: "#8F9BB3",
  },
});
