import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";


import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { Button } from "@ui-kitten/components";
export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);
 // const [response, setResponse] = useState(null);
  const router = useRouter();
  //useeffect to route

 
  //validating email with regex
  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
    setEmail(text);
  };

  //validating pass with regex
  const validatePass = (text: string) => {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPass(passRegex.test(text));
    setPassword(text);
  };
  //handling login
  const handleLogin = async () => {
    if (!email  || !password ) {
     Alert.alert("Kindly provide your credentials");
    } else
    if (!isValidEmail && !isValidPass) {
       Alert.alert("Kindly provide correct credentials");
    } else
    if (!isValidPass) {
     Alert.alert("Passwords must contain a minimum of eight characters ");
    } else
     if (!isValidEmail) {
      Alert.alert("Email is invalid");
    } else{
     
   try {
     setLoading(true)
        
        const response = await axios.post("http://192.168.47.230:5000/login", {
          email,
          password,
        });
        //setResponse(response.data);
        //console.log(response);
        setLoading(false);
        if(response.data.id){

          router.push({
            pathname: 'details',
            params: { id: response.data.id }
          });}
          else {Alert.alert("id not passed")}
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
        }else{setMessage("Network error");}
      }}
  };
  useEffect(()=>{
    if(!message) return
    setTimeout(()=>{
      setMessage("")
    },10000)
  },[message])
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValidEmail && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={validateEmail}
        value={email}
      />
      <TextInput
        style={[styles.input, !isValidPass && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={validatePass}
        value={password}
      />
      <View style={[{ width: "50%", margin: 10 }]}>
        {/* <Button title="Login" color="#f194ff"  onPress={handleLogin} /> */}
        {/* <Link href="/details" style={styles.link}>View details</Link> */}
      </View>
      <Button onPress={handleLogin} 
      appearance="outline"
      disabled={loading}
      style={{
        backgroundColor:"transparent"
      }}
      >
        Login
      </Button>
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    width: "100%",
    marginBottom: 20,
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
  button: {
    backgroundColor: "#f194ff",
    padding: 10,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: "50%",
  },
});
