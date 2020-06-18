import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, ActivityIndicator, Image, TextInput } from 'react-native';
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
            onValueChange={(value) => this.setState({vertical: value})} />
          <Text style={{marginRight: 6, marginLeft: 24}}>Can drag:</Text>
          <Switch
            value={this.state.dragEnabled}
            onValueChange={(value) => this.setState({dragEnabled: value})} />
        </View>

        <Interactable.View
          verticalOnly={this.state.vertical}
          horizontalOnly={!this.state.vertical}
          dragEnabled={this.state.dragEnabled}
          snapPoints={[{y: 0}]}
          style={{width: 300, height: 500, padding: 20, backgroundColor: '#e0e0e0'}}
        >
            <Text style={{alignSelf: 'center', fontSize: 18, margin: 20}}>Hello world</Text>
            <ActivityIndicator animating={true} size='large' style={{marginBottom: 20}} />
            <Image style={{width: 220, height: 120, marginBottom: 20, alignSelf: 'center'}} source={{uri: 'https://static.wixstatic.com/media/e758eb_729674838e084f49bc75db035ed286a6~mv2.jpg/v1/fill/w_300,h_160,al_c,q_80,usm_0.66_1.00_0.01/e758eb_729674838e084f49bc75db035ed286a6~mv2.jpg'}} />
            <TextInput style={{height: 40, backgroundColor: 'white', padding: 4, borderWidth: 1, marginBottom: 20}} />
            <View pointerEvents='none' style={{width: 220, height: 80, backgroundColor: '#542790', marginBottom: 20, alignSelf: 'center'}} />
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
