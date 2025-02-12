import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from "../helpers/common";

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
    {props.icon && props.icon}
    <TextInput
      style={{ flex: 1 }}
      placeholderTextColor={theme.colors.textLight}
      ref={props.InputRef}
      {...props}
    />
  </View>
  
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // 'row' should be a string
      height: hp(7.2),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.4,
      borderColor: theme.colors.text, // Assuming `theme` is defined elsewhere
      borderRadius: theme.radius.xxl,
      borderCurve: 'continuous', // This is not a valid React Native property. You might want to remove it or use a supported value.
      paddingHorizontal: 18,
      gap: 12,
    },
  });
  
