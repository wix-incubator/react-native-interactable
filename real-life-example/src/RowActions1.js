import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import Interactable from 'react-native-interactable';

export default class RowActions1 extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Row>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Row Title</Text>
              <Text style={styles.rowSubtitle}>This is the row subtitle</Text>
            </View>
          </View>
        </Row>
        <Row>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Another Row</Text>
              <Text style={styles.rowSubtitle}>This is the 2nd row subtitle</Text>
            </View>
          </View>
        </Row>
        <Row>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>And A Third</Text>
              <Text style={styles.rowSubtitle}>This is the 3rd row subtitle</Text>
            </View>
          </View>
        </Row>
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
          snapPoints={[{x: 90}, {x: 0}, {x: -155}]}
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
    justifyContent: 'center',
    backgroundColor: 'white',
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
  }
});
