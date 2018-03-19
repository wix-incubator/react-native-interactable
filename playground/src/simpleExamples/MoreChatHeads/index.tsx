import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

interface State {
  currentExample: any;
}

export default class MoreChatHeads extends React.PureComponent<
  undefined,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined,
    };
  }

  private onExamplePress(currentExample) {
    this.setState({currentExample});
  }

  private renderSimple() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0},
            {x: -140, y: -120},
            {x: -140, y: 120},
            {x: -140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 0},
            {x: 140, y: 120},
            {x: 140, y: -120},
            {x: 140, y: -250},
            {x: 140, y: 250},
          ]}
          initialPosition={{x: -140, y: -250}}
        >
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  private renderDragViaSpring() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0},
            {x: -140, y: -120},
            {x: -140, y: 120},
            {x: -140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 0},
            {x: 140, y: 120},
            {x: 140, y: -120},
            {x: 140, y: -250},
            {x: 140, y: 250},
          ]}
          dragWithSpring={{tension: 1000, damping: 0.7}}
          initialPosition={{x: -140, y: -250}}
        >
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  private renderLocalizedSprings() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}>
          <View style={[styles.marker, {top: -120}]} />
        </View>
        <View style={styles.markerContainer}>
          <View style={[styles.marker, {top: 120}]} />
        </View>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0},
            {x: -140, y: -120},
            {x: -140, y: 120},
            {x: -140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 0},
            {x: 140, y: 120},
            {x: 140, y: -120},
            {x: 140, y: -250},
            {x: 140, y: 250},
          ]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          springPoints={[
            {
              x: 0,
              y: -120,
              tension: 4000,
              damping: 0.5,
              influenceArea: {left: -40, right: 40, top: -160, bottom: -80},
              haptics: true,
            },
            {
              x: 0,
              y: 120,
              tension: 4000,
              damping: 0.5,
              influenceArea: {left: -40, right: 40, top: 80, bottom: 160},
              haptics: true,
            },
          ]}
          initialPosition={{x: -140, y: -250}}
        >
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  private renderGravityWells() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}>
          <View style={[styles.marker, {top: -140}]} />
        </View>
        <View style={styles.markerContainer}>
          <View style={[styles.marker, {top: 140}]} />
        </View>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0},
            {x: -140, y: -120},
            {x: -140, y: 120},
            {x: -140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 0},
            {x: 140, y: 120},
            {x: 140, y: -120},
            {x: 140, y: -250},
            {x: 140, y: 250},
          ]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          gravityPoints={[
            {
              x: 0,
              y: -120,
              strength: 8000,
              falloff: 40,
              damping: 0.5,
              haptics: true,
            },
            {
              x: 0,
              y: 120,
              strength: -8000,
              falloff: 40,
              damping: 0.5,
              haptics: true,
            },
          ]}
          onStop={this.onStopInteraction}
          initialPosition={{x: -140, y: -250}}
        >
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  private renderHalfFriction() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[
            {x: -140, y: 0},
            {x: -140, y: -120},
            {x: -140, y: 120},
            {x: -140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 0},
            {x: 140, y: 120},
            {x: 140, y: -120},
            {x: 140, y: -250},
            {x: 140, y: 250},
          ]}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          frictionAreas={[
            {damping: 0.3, influenceArea: {top: 0}, haptics: true},
          ]}
          initialPosition={{x: -140, y: -250}}
        >
          <View style={styles.head} />
        </Interactable.View>
      </View>
    );
  }

  private onStopInteraction(event) {
    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    console.log(`stopped at x=${x}, y=${y}`);
  }

  public render() {
    if (this.state.currentExample) {
      return this.state.currentExample();
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.onExamplePress(this.renderSimple)}
        >
          <Text style={styles.button}>Simple implementation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onExamplePress(this.renderDragViaSpring)}
        >
          <Text style={styles.button}>Drag via spring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onExamplePress(this.renderLocalizedSprings)}
        >
          <Text style={styles.button}>Localized springs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onExamplePress(this.renderGravityWells)}
        >
          <Text style={styles.button}>Gravity wells</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onExamplePress(this.renderHalfFriction)}
        >
          <Text style={styles.button}>Friction on lower half</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
