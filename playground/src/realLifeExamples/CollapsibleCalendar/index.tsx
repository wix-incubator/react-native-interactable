import * as React from "react";
import {View, Dimensions, Image, Text, Animated} from "react-native";
import Interactable from "react-native-interactable";

import styles, {Calendar} from "./styles";

interface RowProps {
  hour: string;
  text: string;
}

class Row extends React.PureComponent<RowProps> {
  public render() {
    return (
      <View style={styles.row}>
        <Text style={styles.hour}>{this.props.hour}</Text>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

export default class CollapsibleCalendar extends React.PureComponent {
  private deltaY = new Animated.Value(0);
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Animated.Text
              style={[
                styles.month,
                {
                  opacity: this.deltaY.interpolate({
                    inputRange: [-Calendar.height * 0.84, 0],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: [
                    {
                      translateY: this.deltaY.interpolate({
                        inputRange: [-Calendar.height * 0.84, 0],
                        outputRange: [-40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              FEBRUARY 2017
            </Animated.Text>
            <Animated.Text
              style={[
                styles.month,
                {
                  opacity: this.deltaY.interpolate({
                    inputRange: [-Calendar.height * 0.84, 0],
                    outputRange: [1, 0],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: [
                    {
                      translateY: this.deltaY.interpolate({
                        inputRange: [-Calendar.height * 0.84, 0],
                        outputRange: [0, 40],
                      }),
                    },
                  ],
                },
              ]}
            >
              THIS WEEK
            </Animated.Text>
          </View>
          <Image
            style={styles.days}
            source={require("../../../img/calendar-header.png")}
          />
        </View>

        <Animated.Image
          style={[
            styles.calendar,
            {
              transform: [
                {
                  translateY: this.deltaY.interpolate({
                    inputRange: [-Calendar.height * 0.84, 0],
                    outputRange: [-Calendar.height * 0.5, 0],
                  }),
                },
              ],
            },
          ]}
          source={require("../../../img/calendar-body.png")}
        />

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -Calendar.height * 0.84}]}
          boundaries={{top: -Calendar.height}}
          animatedValueY={this.deltaY}
        >
          <View style={styles.content}>
            <Row hour="09:00" text="Reminder Only: UX" />
            <Row hour="10:20" text="Mobile Guild Core - Daily" />
            <Row hour="18:00" text="Mobile Happy Thursday!" />
          </View>
        </Interactable.View>
      </View>
    );
  }
}
