import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Row from '../container/Row';
import Center from '../container/Center';
import TextProximaSoft from '../text/TextProximaSoft';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    onChange: (checked: boolean) => void,
    checked: boolean,
    label?: string | any,
    wrapperStyle?: any,
    radioStyle?: any,
}
const CheckBox = (props: Props) => {
    const {
        onChange = (checked: boolean) => { },
        checked,
        label,
        wrapperStyle,
        radioStyle
    } = props;

    const borderColor = checked ? '#0767DB' : '#AAA';
    const backgroundColor = checked ? '#0767DB' : 'transparent';

    const radioMarginRight = label ? 15 : 0;

    return (
        <TouchableOpacity onPress={() => onChange(!checked)} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Row middle={true}>
                    <Center style={[styles.outRadio, { borderColor, backgroundColor, marginRight: radioMarginRight }, radioStyle]}>
                        <MaterialIcons name="check" color='#FAFAFA' size={20} />
                    </Center>
                    <TextProximaSoft fontWeight={checked ? '600' : 'normal'}>{label}</TextProximaSoft>
                </Row>
            </View>
        </TouchableOpacity>
    );
}

const SIZE = 24;
const styles = EStyleSheet.create({
    wrapper: {
        paddingBottom: 15,
    },
    outRadio: {
        height: SIZE,
        width: SIZE,
        borderRadius: 2,
        borderWidth: 2,
    }
})

export default CheckBox;
