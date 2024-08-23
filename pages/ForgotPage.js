import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPage = () => {
    const [email, setEmail] = useState('');
  
    const handleEmailChange = (text) => {
        setEmail(text);
    };
  
    const handleSendPress = () => {
        
    };
  
    return (
        <LinearGradient
            colors={['#FBA834', '#2c5282']} 
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={[styles.title, { color: '#fff' }]}>Forgot Password</Text>
                <Text style={[styles.instruction, { color: '#fff' }]}>
                    Please enter your email address. You will receive a link to create a new password via email.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff" // Change placeholder text color
                    keyboardType="email-address"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <Text style={styles.errorText}>Not a valid email address. Should be your@email.com</Text>
                <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
                    <Text style={styles.sendButtonText}>SEND</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    instruction: {
        fontSize: 14,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'white', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 5,
        color: '#fff', 
    },
    errorText: {
        color: 'white', 
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
    },
    sendButton: {
        backgroundColor: '#FBA834', 
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
  
export default ForgotPage;
