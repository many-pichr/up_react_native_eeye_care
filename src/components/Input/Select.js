/**
 * flow
 */
import React, { Component } from 'react';
import {
    View, TextInput, TextInputProps, Text, Animated, StyleSheet,
    StyleProp, ViewStyle, TouchableWithoutFeedback, TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Row from '../Container/Row';
import Col from '../Container/Col';

type Option = {
    value: any,
    label: any,
}

type Props = {
    value: string,
    onSelect: (value: any) => void,
    onRequestClose: () => void,
    label: string,
    wrapperStyle?: StyleProp<ViewStyle>,
    inputProps?: TextInputProps,
    options: [Option]
}

class Select extends React.PureComponent<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            option: null,
            focused: false,
            labelTop: new Animated.Value(12),
            labelSize: new Animated.Value(16)
        }
    }

    componentDidMount() {
        const { options = [], value } = this.props;
        const selected = options.filter((option, index) => {
            return option.value === value;
        });
        if (selected && selected.length > 0) {
            this.setState({ option: selected[0] })
        }
    }

    animateLabelUp = () => {
        const { labelTop, labelSize } = this.state;
        Animated.parallel([
            Animated.timing(labelTop, {
                toValue: -8, duration: 200
            }),
            Animated.timing(labelSize, {
                toValue: 12, duration: 200
            })
        ]).start();
    }

    animateLabelDown = () => {
        const { value } = this.props;
        if (value) return;

        const { labelTop, labelSize } = this.state;
        Animated.parallel([
            Animated.timing(labelTop, {
                toValue: 12, duration: 200
            }),
            Animated.timing(labelSize, {
                toValue: 16, duration: 200
            })
        ]).start();
    }

    onInputPress = () => {
        this.setState({ focused: true });
        this.animateLabelUp()
    }

    onOptionPress = (option: Option) => {
        console.log(option);
        const {
            onChange = () => { },
            onRequestClose = () => { }
        } = this.props;
        onChange(option.value);
        this.setState({ focused: false, option }, () => {
            this.animateLabelDown()
        });
    }

    closeModal = () => {
        this.setState({ focused: false }, () => {
            this.animateLabelDown()
        })
    }

    render() {
        const {
            focused, option,
            labelTop, labelSize
        } = this.state;

        const {
            value = '',
            label = '',
            onChange = () => { },
            inputProps = {},
            options = [],
        } = this.props;
        console.log(options, value, label)
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={this.onInputPress} style={styles.input} >
                    <Row centerVertical>
                        <Col flex={1}><Text>{option ? option.label : ''}</Text></Col>
                        <Col><FontAwesome name="caret-down" size={15}/></Col>
                    </Row>

                </TouchableOpacity>
                <Animated.View style={[styles.label, { top: labelTop }]}>
                    <TouchableWithoutFeedback onPress={this.onInputPress}>
                        <View>
                            {typeof label === 'string' ? <Animated.Text style={{ fontSize: labelSize }}>{label}</Animated.Text> : label}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Modal
                    isVisible={focused}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    onDismiss={this.closeModal}
                    onBackdropPress={this.closeModal}
                    style={{ flex: 1 }}
                >
                    <Col style={{ maxHeight: '80%', backgroundColor: 'white', borderRadius: 5, }} centerVertical>
                        <FlatList
                            contentContainerStyle={{ paddingVertical: 10 }}
                            data={options}
                            keyExtractor={(item, index) => `${item.value}${item.label}`}
                            ItemSeparatorComponent={() => <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#DDD', marginHorizontal: 20 }} />}
                            renderItem={({ item, index }) => {
                                console.log(item)
                                return (
                                    <TouchableOpacity onPress={() => this.onOptionPress(item)}>
                                        <Row
                                            alignMiddle
                                            paddingVertical={15}
                                            paddingHorizontal={20}
                                        >
                                            <Col flex={1}>
                                                <Text>{item.label}</Text>
                                            </Col>
                                            {(!!value && value === item.value) && (
                                                <MaterialIcons name="check" size={20} color="green" />
                                            )}
                                        </Row>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </Col>
                </Modal>
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

export default Select;