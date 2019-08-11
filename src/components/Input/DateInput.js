/**
 * flow
 */
import React, { Component } from 'react';
import {
    View, TextInput, TextInputProps, Text, Animated, StyleSheet,
    StyleProp, ViewStyle, TouchableOpacity
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

type Props = {
    value: Date,
    onChange: (value: Date) => void,
    label: string,
    wrapperStyle?: StyleProp<ViewStyle>,
    inputProps?: TextInputProps,
    displayFormat?: String, // display format using moment
}

class DateInput extends React.PureComponent<Props, any> {

    static defaultProps = {
        displayFormat: 'DD-MM-YYYY'
    }

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            labelTop: new Animated.Value(12),
            labelSize: new Animated.Value(16)
        }
    }

    handleOnChange = (date) => {
        const { onChange = () => { } } = this.props;
        onChange((date));
        this.setState({ focused: false })
    }

    handleInputFocus = () => {
        const { labelTop, labelSize, focused } = this.state;
        this.setState({ focused: true });
        Animated.parallel([
            Animated.timing(labelTop, {
                toValue: -8, duration: 200
            }),
            Animated.timing(labelSize, {
                toValue: 12, duration: 200
            })
        ]).start();
    }

    handleInputBlur = () => {
        this.setState({ focused: false })

        const { value } = this.props;
        if (value) return;

        const { labelTop, labelSize } = this.state;
        Animated.parallel([
            Animated.timing(labelTop, {
                toValue: 12, duration: 200
            }),
            Animated.timing(labelSize, {
                toValue: 14, duration: 200
            })
        ]).start();
    }

    handleOnLabelPress = () => {
        // this.inputRef && this.inputRef.focus();
        this.handleInputFocus()
    }

    render() {
        const {
            labelTop, labelSize, focused
        } = this.state;

        const {
            value = '',
            label = '',
            onChangeText = () => { },
            inputProps = {},
            displayFormat,
        } = this.props;
        return (
            <View style={styles.wrapper}>
                {/* <TextInput
                    {...inputProps}
                    ref={ref => this.inputRef = ref}
                    value={(value) ? moment(value).format(displayFormat) : ''}
                    onFocus={this.handleInputFocus}
                    // onChangeText={this.handleOnChange}
                    onBlur={this.handleInputBlur}
                    style={[styles.input, inputProps.style]}
                /> */}
                <TouchableOpacity onPress={this.handleInputFocus} style={[styles.input]} >
                    <Text>{(value) ? moment(value).format(displayFormat) : ''}</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.label, { top: labelTop }]}>
                    <TouchableWithoutFeedback onPress={this.handleOnLabelPress}>
                        <View>
                            {typeof label === 'string' ? <Animated.Text style={{ fontSize: labelSize }}>{label}</Animated.Text> : label}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <DateTimePicker
                    isVisible={focused}
                    onCancel={this.handleInputBlur}
                    onConfirm={(date) => { this.handleOnChange(date) }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderColor: '#AAA',
        height: 45,
        borderRadius: 4,
        marginHorizontal: 15,
        marginTop: 15,
        justifyContent: 'center',
    },
    input: { paddingHorizontal: 10, flex: 1, justifyContent: 'center' },
    label: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        paddingHorizontal: 5,
    }
});

export default DateInput;