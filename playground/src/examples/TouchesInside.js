import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, Button, Picker, Slider, WebView } from 'react-native';
import Interactable from 'react-native-interactable';

export default class TouchesInside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: true,
      dragEnabled: true,
      language: 'java',
      switch: true
    };
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.direction}>
          <Text style={{marginRight: 6}}>Vertical:</Text>
          <Switch
            value={this.state.vertical}
            onValueChange={(value) => this.setState({vertical: value})}
          />
          <Text style={{marginRight: 6, marginLeft: 24}}>Can drag:</Text>
          <Switch
            value={this.state.dragEnabled}
            onValueChange={(value) => this.setState({dragEnabled: value})}
          />
        </View>

        <Interactable.View
          verticalOnly={this.state.vertical}
          horizontalOnly={!this.state.vertical}
          dragEnabled={this.state.dragEnabled}
          snapPoints={[{y: 0}]}
          style={{width: 300, height: 600, padding: 20, backgroundColor: '#e0e0e0'}}
        >
          <Button title='Button' onPress={() => { alert('Button pressed')}} />
          <Picker
            style={{width: 220, backgroundColor: 'white', margin: 20}}
            selectedValue={this.state.language}
            onValueChange={(lang) => this.setState({language: lang})}>
            <Picker.Item label="Objective-C" value="objc" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Slider style={{marginBottom: 20}} />
          <Switch
            style={{alignSelf: 'center', marginBottom: 20}}
            value={this.state.switch}
            onValueChange={(value) => this.setState({switch: value})}
          />
          <WebView
            source={{uri: 'https://static.wixstatic.com/media/e758eb_729674838e084f49bc75db035ed286a6~mv2.jpg/v1/fill/w_733,h_489,al_c,q_80,usm_0.66_1.00_0.01/e758eb_729674838e084f49bc75db035ed286a6~mv2.jpg'}}
            style={{width: 220, alignSelf: 'center'}}
          />
        </Interactable.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  }
});
