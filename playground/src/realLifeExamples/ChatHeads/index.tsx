import * as React from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import styles from "./styles";

export default class ChatHeads extends React.PureComponent {
    public render() {
        return (
          <View style={styles.container}>
            <Text>ChatHeads</Text>
          </View>
        );
    }
}
