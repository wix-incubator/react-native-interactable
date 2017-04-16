/**
 * Created by levv on 16/04/2017.
 */
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Switch, Text} from 'react-native';
import Interactable from 'react-native-interactable';


export default class ViewWithInterceptionBlocker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockAllTouch: false,
            blockVerticalSwipe: false,
            blockHorizontalSwipe: false,
            canScroll: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.direction}>
                    <Text>Block interception of all touch events </Text>
                    <Switch
                        value={this.state.blockAllTouch}
                        onValueChange={(value) => this.setState({blockAllTouch: value})} />
                    <Text>Block interception of vertical swiping </Text>
                    <Switch
                        value={this.state.blockVerticalSwipe}
                        onValueChange={(value) => this.setState({blockVerticalSwipe: value})} />
                    <Text>Block interception of horizontal swiping</Text>
                    <Switch
                        value={this.state.blockHorizontalSwipe}
                        onValueChange={(value) => this.setState({blockHorizontalSwipe: value})} />
                </View>

                <Interactable.View
                    key="card"
                    snapPoints={[
                        {x: 0}
                    ]}>
                    <View style={styles.card1}>
                        <Text style={{fontSize: 12,fontWeight: 'bold'}}>Regular view</Text>
                    </View>
                    <Interactable.InterceptionBlocker
                        style={{left: 0, right: 0, height: 100,backgroundColor: '#e0e0e0'}}
                        blockAllTouch={this.state.blockAllTouch}
                        blockVerticalSwipe={this.state.blockVerticalSwipe}
                        blockHorizontalSwipe={this.state.blockHorizontalSwipe}>
                     <View style={styles.card2}>
                        <Text style={{fontSize: 12,fontWeight: 'bold'}}>View wrapped with InterceptionBlocker</Text>
                     </View>
                     </Interactable.InterceptionBlocker>
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
        alignItems: 'flex-start',
        marginBottom: 50,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    card1: {
        width: 250,
        height: 100,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card2: {
        width: 250,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b5e0dd'
    },
});
