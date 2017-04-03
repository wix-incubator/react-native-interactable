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
          <Text style={{marginRight: 10}}>Vertical: </Text>
          <Switch
            value={this.state.vertical}
            onValueChange={(value) => this.setState({vertical: value})} />
          <Text style={{marginRight: 10, marginLeft: 20}}>Can drag: </Text>
          <Switch
            value={this.state.dragEnabled}
            onValueChange={(value) => this.setState({dragEnabled: value})} />
        </View>

        <Interactable.View
          verticalOnly={this.state.vertical}
          horizontalOnly={!this.state.vertical}
          dragEnabled={this.state.dragEnabled}
          snapPoints={[{y: 0}]}>
          <View style={{width: 300, height: 500, backgroundColor: '#cccccc', padding: 20, borderRadius: 10}}>

            <Button title='Button' onPress={() => { alert('Button pressed')}} />

            <Picker
              style={{backgroundColor: '#ff000020'}}
              selectedValue={this.state.language}
              onValueChange={(lang) => this.setState({language: lang})}>
              <Picker.Item label="Objective-C" value="objc" />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <Slider style={{marginVertical: 10}} />

            <Switch
              style={{alignSelf: 'center'}}
              value={this.state.switch}
              onValueChange={(value) => this.setState({switch: value})} />

            <WebView
              source={{uri: 'https://i.imgur.com/vKb4qnU.jpg'}}
              style={{width: 150, height: 100, marginVertical: 10, alignSelf: 'center'}} />

          </View>
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
