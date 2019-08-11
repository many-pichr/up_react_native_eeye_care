import React from 'react';
import { View, StyleSheet, ViewProps, } from "react-native";

type Props = ViewProps & {
    chidren: any,
    style: StyleProp<ViewStyle>,
    reverse: boolean,
    alignMiddle: boolean,
    flex: number,

    padding: number | string,
    paddingVertical: number | string,
    paddingHorizontal: number | string,
    paddingLeft: number | string,
    paddingRight: number | string,
    paddingTop: number | string,
    paddingBottom: number | string,
    margin: number | string,
    marginVertical: number | string,
    marginHorizontal: number | string,
    marginLeft: number | string,
    marginRight: number | string,
    marginTop: number | string,
    marginBottom: number | string,
}

const Row = (props: Props) => {
    const {
        children, style, reverse = false, flex = null, alignMiddle = true,
        padding, paddingVertical, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingBottom,
        margin, marginVertical, marginHorizontal, marginLeft, marginRight, marginTop, marginBottom, ...otherProps
    } = props;
    return (
        <View style={[
            alignMiddle && { alignItems: 'center' },
            { flex },
            { flexDirection: reverse ? 'row-reverse' : 'row' },
            { padding, paddingVertical, paddingHorizontal, paddingLeft, paddingRight, paddingTop, paddingBottom, },
            { margin, marginVertical, marginHorizontal, marginLeft, marginRight, marginTop, marginBottom, },
            style
        ]} {...otherProps}>
            {children}
        </View>
    )
}

export default Row;