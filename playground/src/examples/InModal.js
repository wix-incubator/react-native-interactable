import React, { Component } from 'react';
import { StyleSheet, Animated, SafeAreaView, View, Modal, TouchableOpacity, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class InModal extends Component {
  constructor(props) {
    super(props);
    
    this._deltaX = new Animated.Value(0);
    
    this.state = {
      visible: false
    }
  }

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  }

  render() {
    if (!this.state.visible) {
      return (
        <View style={[styles.container, {alignItems: 'center'}]}>
          <TouchableOpacity style={styles.button} onPress={this.toggleModal} activeOpacity={0.8}>
            <Text style={{textAlign: 'center'}}>Show</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Modal
        visible={this.state.visible}
        onRequestClose={this.toggleModal}
        animationType="slide"
      >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.toggleModal} activeOpacity={0.8}>
          <Text style={{textAlign: 'center'}}>Close</Text>
        </TouchableOpacity>
        
        <View style={{backgroundColor: '#32B76C'}}>
          <View style={{position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
              <Animated.View style={
                [styles.icon, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-230, -230, -180, -180],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-230, -230, -180, -180],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
              <Animated.View style={
                [styles.icon, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-165, -165, -115, -115],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-165, -165, -115, -115],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
              <Animated.View style={
                [styles.icon, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-100, -100, -50, -50],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-100, -100, -50, -50],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
            </View>
            <Interactable.View
              horizontalOnly={true}
              snapPoints={[{x: 0, id: 'closed'}, {x: -230, id: 'open'}]}
              onSnap={this.onDrawerSnap}
              animatedValueX={this._deltaX}
            >
              <View style={{left: 0, right: 0, height: 75, backgroundColor: '#e0e0e0'}} />
            </Interactable.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[{x: 360},{x: 0},{x: -360}]}
        >
          <TouchableOpacity style={styles.card} onPress={this.onCardPress}>
            <TouchableOpacity style={styles.cardButton} onPress={this.onButtonPress}>
              <Text style={{textAlign: 'center'}}>Button</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Interactable.View>

        <Interactable.View
          snapPoints={[
            {x: 0, y: -250},
            {x: 140, y: -250},
            {x: 0, y: -120},
            {x: 140, y: -120},
            {x: 0, y: 0},
            {x: 140, y: 0},
            {x: 0, y: 120},
            {x: 140, y: 120},
            {x: 0, y: 250},
            {x: 140, y: 250, tension: 50, damping: 0.9}
          ]}
          initialPosition={{x: 0, y: 100}}
        >
          <View style={{width: 70, height: 70, backgroundColor: '#EE2C38', borderRadius: 35}} />
        </Interactable.View>
      </SafeAreaView>
      </Modal>
    );
  }

  onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`drawer state is ${snapPointId}`);
  }
  onCardPress() {
    alert('Card was pressed');
  }
  onButtonPress() {
    alert('Button was pressed');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 25,
    backgroundColor: '#EE2C38'
  },
  button: {
    width: 80,
    height: 40,
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#b5d9f8',
    borderRadius: 20,
    borderWidth: 1
  },
  card: {
    width: 300,
    height: 180,
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#32B76C',
    borderRadius: 8,
  },
  cardButton: {
    width: 80,
    height: 40,
    margin: 30,
    justifyContent: 'center',
    backgroundColor: '#EE2C38'
  }
});
