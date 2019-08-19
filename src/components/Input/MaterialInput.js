/**
 * flow
 */
import React, { Component } from 'react';
import {
    View, TextInput, TextInputProps, Text, Animated, StyleSheet,
    StyleProp, ViewStyle,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
    value: string,
    onChangeText: (text: string) => void,
    label: string,
    wrapperStyle?: StyleProp<ViewStyle>,
    inputProps?: TextInputProps,
}

class MaterialInput extends Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            labelTop: new Animated.Value(15),
            labelSize: new Animated.Value(14)
        }
    }

    handleOnChangeText = (text) => {
        const { onChangeText = () => { } } = this.props;
        onChangeText(text);
    }


    render() {
        const {
            labelTop, labelSize
        } = this.state;

        const {
            value = '',
            label = '',
            onChangeText = () => { },
            inputProps = {},
            size=40,
            multiline=false
        } = this.props;
        return (
            <View style={styles.wrapper}>
                <TextInput
                    {...inputProps}
                    ref={ref => this.inputRef = ref}
                    value={value}
                    placeholder={label}
                    multiline={multiline}
                    onChangeText={this.handleOnChangeText}
                    style={[styles.input, inputProps.style,{height:size}]}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 4,
        marginHorizontal: 15,
        marginTop: 2,
        justifyContent: 'center',
    },
    input: { paddingHorizontal: 10, height: '100%' },
    label: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        paddingHorizontal: 5,
    }
});

export default MaterialInput;