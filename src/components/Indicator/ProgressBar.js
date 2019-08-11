import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
type Props = {
    progress: number, // 0->100
}
class ProgressBar extends Component<Props> {

    static defaultProps = {
        progress: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            progressWidth: new Animated.Value(props.progress),
        }
    }

    componentWillReceiveProps(nextProps) {
        const { progress } = nextProps;
        if (!isNaN(progress) && progress !== this.props.progress) {
            const { progressWidth } = this.state;
            Animated.timing(progressWidth, {
                toValue: +progress, duration: 200
            }).start();
        }
    }


    render() {
        const { progressWidth } = this.state;
        const width = progressWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        });
        return (
            <View style={styles.wrapper}>
                <Animated.View style={[styles.progress, { width }]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { width: '100%', height: 5, backgroundColor: 'lightgrey', borderRadius: 6, overflow: "hidden" },
    progress: { backgroundColor: 'green', height: 5, borderRadius: 6 }
})

export default ProgressBar;
