import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Row from '../Container/Row';
import Col from '../Container/Col';

type Props = {
    onChange(checked: boolean): void,
    value: boolean,
    label?: string,
    wrapperStyle?: any,
}
const Radio = (props: Props) => {
    const {
        onChange = (checked: boolean) => { },
        checked,
        label,
        wrapperStyle
    } = props;

    const borderColor = checked ? '#0767DB' : '#AAA';
    const backgroundColor = checked ? '#0767DB' : 'transparent';
    return (
        <TouchableOpacity onPress={() => onChange(!checked)}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Row>
                    <Col center style={[styles.outRadio, { borderColor }]}>
                        <View style={[styles.inRadio, { backgroundColor }]}></View>
                    </Col>
                    <Text>{label}</Text>
                </Row>
            </View>
        </TouchableOpacity>
    );
}

const SIZE = 24;
const styles = StyleSheet.create({
    wrapper: {
        marginTop: 15,
        marginHorizontal: 15
    },
    inRadio: {
        height: SIZE / 1.8,
        width: SIZE / 1.8,
        borderRadius: SIZE / 2,
    },
    outRadio: {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
        borderWidth: 2,
        marginRight: 15,
    }
})

export default Radio;
