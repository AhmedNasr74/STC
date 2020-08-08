import React , {Component } from 'react';
import {Text, View} from 'react-native';
import AppBar from '../Components/AppBar';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {StyleSheet , TouchableHighlight , Image} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Voice from 'react-native-voice';
class Editor extends Component{
    state = {
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
      };
    
      constructor(props) {
        super(props);
        //Setting callbacks for the process status
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
      }
    
      componentWillUnmount() {
        //destroy the process after switching the screen 
        Voice.destroy().then(Voice.removeAllListeners);
      }
    
      onSpeechStart = e => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        this.setState({
          started: '√',
        });
      };
    
      onSpeechEnd = e => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        this.setState({
          end: '√',
        });
      };
    
      onSpeechError = e => {
        //Invoked when an error occurs. 
        console.log('onSpeechError: ', e);
        this.setState({
          error: JSON.stringify(e.error),
        });
      };
    
      onSpeechResults = e => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        this.setState({
          results: e.value,
        });
      };
    
      onSpeechPartialResults = e => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        this.setState({
          partialResults: e.value,
        });
      };
    
      onSpeechVolumeChanged = e => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
          pitch: e.value,
        });
      };
    
      _startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        this.setState({
          pitch: '',
          error: '',
          started: '',
          results: [],
          partialResults: [],
          end: '',
        });
    
        try {
          await Voice.start('en-US');
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _stopRecognizing = async () => {
        //Stops listening for speech
        try {
          await Voice.stop();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
          await Voice.cancel();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
          await Voice.destroy();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
        this.setState({
          pitch: '',
          error: '',
          started: '',
          results: [],
          partialResults: [],
          end: '',
        });
      };

    render(){
        var code = "function sum(num){\n \tnum + 1;\n}\nvar name = 1;\nfor(i=1;i<2;i++){\n \t i +=6;\n}";
        // code = prettier.format(code, { semi: true, parser: "babel" });
        return(
            <View>
                <AppBar />
                <SyntaxHighlighter codeTagProps={{marginLeft:5}} customStyle={{width:"100%",height:"90%",'margin':0 ,borderRadius:0}} highlighter={"prism" || "hljs"} language="javascript" style={dark}>
                    {code}
                </SyntaxHighlighter>
                <Text style={styles.lines}>
                    1
                    2
                    3
                    4
                    5
                    6
                    7
                </Text>
                {/* <FloatingAction
                    style={{marginBottom:30}}
                    // actions={{margin:20}
                    // floatingIcon="mic"
                    onClose={close =>{
                        this._stopRecognizing();
                    }}
                    position="center"
                    color="#42ADDA"
                    onPressMain={name => {
                        this._startRecognizing();
                    }}
                /> */}

            <TouchableHighlight
                onPress={this._startRecognizing}
                style={ styles.voicebtn }>
                <Image
                style={styles.button}
                source={{
                    uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
                }}
                />
            </TouchableHighlight>
           
            </View>
            
            );
        }
}

export default Editor;

const styles = StyleSheet.create({
    lines:{
        width:"4%",
        backgroundColor:'#DDD',
        textAlign:"center",
        paddingTop:15,
        height:"100%",
        position:"absolute",
        top:80,
        zIndex:1000,
        lineHeight:18
    },
    voicebtn:{
      position: "absolute",
      bottom:20,
      left: 220,
      backgroundColor:"#42ADDA",
      padding:5,
      borderRadius:7
    },
    voiceStop:{
      position: "absolute",
      bottom:20,
      left: 100,
      backgroundColor:"#42ADDA",
      padding:5,
      borderRadius:7
    },

    button: {
        width: 50,
        height: 50,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    action: {
      width: '100%',
      textAlign: 'center',
      color: 'white',
      paddingVertical: 8,
      marginVertical: 5,
      fontWeight: 'bold',
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    stat: {
      textAlign: 'center',
      color: '#B0171F',
      marginBottom: 1,
      marginTop: 30,
    }
})