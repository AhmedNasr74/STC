import React from 'react';
import {Text, View ,StyleSheet} from 'react-native';

export default function AppBar(){

    return(
        <View style={styles.bar}>
            <Text style={styles.title}>STC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bar :{
        height:80 ,
        paddingTop:35,
        backgroundColor:"#42ADDA",
    },
    title:{
        textAlign:"center",
        color:'#FFF',
        fontSize:23,
        fontWeight:"bold"
    }
});