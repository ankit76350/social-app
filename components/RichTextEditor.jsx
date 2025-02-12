import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { theme } from '../constants/theme'
import { hp ,wp} from '../helpers/common'

const RichTextEditor = ({
    editorRef, onChange
}) => {
    return (
        <View style={{ minHeight: 285 }}>
            <RichToolbar
                actions={[
                    actions.setStrikethrough,
                    actions.removeFormat, // Fixed typo: remove Format → removeFormat
                    actions.setBold,
                    actions.setItalic,
                    actions.insertOrderedList,
                    actions.blockquote,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.code,
                    actions.line,
                    actions.heading1,
                    actions.heading4,
                ]}
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>,
                    [actions.heading4]: ({ tintColor }) => <Text style={{ color: tintColor }}>H4</Text>
                }}
                selectedIconTint={theme.colors.primaryDark}
                style={styles.richBar} // Fixed incorrect brackets
                flatContainerStyle={styles.flatStyle} // Fixed incorrect brackets
                editor={editorRef} // Fixed incorrect syntax
                disabled={false}
            />

            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                editorStyle={styles.contentStyle}
                placeholder={"What's on your mind"}
                onChange={onChange}
            />



        </View>

    )
}

export default RichTextEditor
const styles = StyleSheet.create({
    richBar: {
      borderTopRightRadius: theme.radius.xl,
      borderTopLeftRadius: theme.radius.xl,
      backgroundColor: theme.colors.gray,
    },
  
    rich: {
      minHeight: 240,
      flex: 1,
      borderWidth: 1.5,
      borderTopWidth: 0,
      borderBottomLeftRadius: theme.radius.xl,
      borderBottomRightRadius: theme.radius.xl,
      borderColor: theme.colors.gray, // Assuming this is the correct property
      padding: 5,
    },
  
    contentStyle: {
      color: theme.colors.text,
      placeholderColor: 'gray', // Assuming this is the correct key
    },

    flatStyle:{
        paddingHorizontal:8,
        gap:3
    },

   

  });
  