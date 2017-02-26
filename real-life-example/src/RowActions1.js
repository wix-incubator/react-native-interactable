import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Slider, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

export default class RowActions1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      damping: 0.7,
      tension: 300
    };
  }
  render() {
    return (
      <View style={styles.container}>

        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Row Title</Text>
              <Text style={styles.rowSubtitle}>This is the row subtitle</Text>
            </View>
          </View>
        </Row>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Another Row</Text>
              <Text style={styles.rowSubtitle}>This is the 2nd row subtitle</Text>
            </View>
          </View>
        </Row>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>And A Third</Text>
              <Text style={styles.rowSubtitle}>This is the 3rd row subtitle</Text>
            </View>
          </View>
        </Row>

        <View style={styles.playground}>
          <Text style={styles.playgroundLabel}>Change spring damping:</Text>
          <Slider
            key='damping'
            style={styles.slider}
            value={this.state.damping}
            minimumValue={0.0}
            maximumValue={1.0}
            onValueChange={(value) => this.setState({damping: value})}
          />
          <Text style={styles.playgroundLabel}>Change spring tension:</Text>
          <Slider
            key='tension'
            style={styles.slider}
            value={this.state.tension}
            minimumValue={0.0}
            maximumValue={2000.0}
            onValueChange={(value) => this.setState({tension: value})}
          />
        </View>

      </View>
    );
  }
}

class Row extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  render() {
    return (
      <View style={{backgroundColor: '#de6d77'}}>

        <View style={{position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this, 'trash')}>
            <Animated.Image source={require('../img/icon-trash.png')} style={
              [styles.buttonRight, {
                opacity: this._deltaX.interpolate({
                  inputRange: [-155, -155, -115, -115],
                  outputRange: [1, 1, 0, 0]
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [-155, -155, -115, -115],
                    outputRange: [1, 1, 0.7, 0.7]
                  })
                }]
              }
            ]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onButtonPress.bind(this, 'snooze')}>
            <Animated.Image source={require('../img/icon-clock.png')} style={
              [styles.buttonRight, {
                opacity: this._deltaX.interpolate({
                  inputRange: [-90, -90, -50, -50],
                  outputRange: [1, 1, 0, 0]
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [-90, -90, -50, -50],
                    outputRange: [1, 1, 0.7, 0.7]
                  })
                }]
              }
            ]} />
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', left: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this, 'done')}>
            <Animated.Image source={require('../img/icon-check.png')} style={
              [styles.buttonLeft, {
                opacity: this._deltaX.interpolate({
                  inputRange: [50, 50, 90, 90],
                  outputRange: [0, 0, 1, 1]
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [50, 50, 90, 90],
                    outputRange: [0.7, 0.7, 1, 1]
                  })
                }]
              }
            ]} />
          </TouchableOpacity>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 90, damping: this.props.damping, tension: this.props.tension},
            {x: 0, damping: this.props.damping, tension: this.props.tension},
            {x: -155, damping: this.props.damping, tension: this.props.tension}
          ]}
          animatedValueX={this._deltaX}>
          <View style={{left: 0, right: 0, height: 75, backgroundColor: 'white'}}>
            {this.props.children}
          </View>
        </Interactable.View>

      </View>
    );
  }
  onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee'
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#73d4e3',
    margin: 20
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray'
  },
  buttonRight: {
    width: 40,
    height: 40,
    marginRight: 25
  },
  buttonLeft: {
    width: 40,
    height: 40,
    marginLeft: 25
  },
  playground: {
    marginTop: 80,
    padding: 20,
    width: Screen.width - 40,
    backgroundColor: '#5894f3',
    alignItems: 'stretch',
    alignSelf: 'center'
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15
  },
  slider: {
    height: 40
  }
});
