import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class MoreChatHeads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined
    }
  }

  render() {
    if (this.state.currentExample) {
      return this.state.currentExample();
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, this.renderSimple.bind(this))}>
          <Text style={styles.button}>Simple implementation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, this.renderDragViaSpring.bind(this))}>
          <Text style={styles.button}>Drag via spring</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, this.renderLocalizedSprings.bind(this))}>
          <Text style={styles.button}>Localized springs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, this.renderGravityWells.bind(this))}>
          <Text style={styles.button}>Gravity wells</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, this.renderHalfFriction.bind(this))}>
          <Text style={styles.button}>Friction on lower half</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onExamplePress(currentExample) {
    this.setState({currentExample});
  }

  renderSimple() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -280}, {x: -140, y: 280},
            {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -280}, {x:  140, y: 280}]}
          initialPosition={{x: -140, y: -280}}>
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  renderDragViaSpring() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -280}, {x: -140, y: 280},
            {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -280}, {x:  140, y: 280}]}
          dragWithSpring={{tension: 1000, damping: 0.7}}
          initialPosition={{x: -140, y: -280}}>
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  renderLocalizedSprings() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}><View style={[styles.marker, {top: -140}]} /></View>
        <View style={styles.markerContainer}><View style={[styles.marker, {top:  140}]} /></View>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -280}, {x: -140, y: 280},
            {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -280}, {x:  140, y: 280}]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          springPoints={[
            {x: 0, y:-140, tension: 4000, damping: 0.5, limitX: {min: -40, max: 40}, limitY: {min: -180, max: -100}, haptics: true},
            {x: 0, y: 140, tension: 4000, damping: 0.5, limitX: {min: -40, max: 40}, limitY: {min:  100, max:  180}, haptics: true}]}
          initialPosition={{x: -140, y: -280}}>
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  renderGravityWells() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}><View style={[styles.marker, {top: -140}]} /></View>
        <View style={styles.markerContainer}><View style={[styles.marker, {top:  140}]} /></View>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -280}, {x: -140, y: 280},
            {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -280}, {x:  140, y: 280}]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          gravityPoints={[
            {x: 0, y:-140, strength:  8000, falloff: 40, damping: 0.5, haptics: true},
            {x: 0, y: 140, strength: -8000, falloff: 40, damping: 0.5, haptics: true}]}
          onStop={this.onStopInteraction}
          initialPosition={{x: -140, y: -280}}>
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  renderHalfFriction() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -280}, {x: -140, y: 280},
            {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -280}, {x:  140, y: 280}]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          frictionAreas={[{damping: 0.3, limitY: {min: 0}, haptics: true}]}
          initialPosition={{x: -140, y: -280}}>
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  onStopInteraction(event) {
    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    console.log(`stopped at x=${x}, y=${y}`);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    color: 'blue',
    fontSize: 24,
    marginBottom: 24
  },
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  marker: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#dddddd',
    position: 'relative'
  },
  head : {
    width: 70,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 35,
    borderWidth: 0.5
  }
});
