import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'
import Icon from '../../assets/icons/Index'
import Button from '../../components/Button'
import * as ImagePicker from 'expo-image-picker';
import { getSupabaseFileUrl } from '../../services/imageService'
import { Video } from 'expo-av'
import { createOrUpdatePost } from '../../services/postService'

const NewPost = () => {
    const { user } = useAuth()
    const bodyRef = useRef("")
    const editorRef = useRef(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(file)

    const onPick = async (isImage) => {
        let mediaConfig = {
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3], // Fixed incorrect bracket
            quality: 0.7,
        };

        if (!isImage) {
            mediaConfig = {
                mediaTypes: ['videos'],
                allowsEditing: true,
            };
        }

        let result = await ImagePicker.launchImageLibraryAsync(mediaConfig); // Fixed incorrect function syntax

        console.log("file type (NewPost Page): ", result.assets[0]);

        if (!result.canceled) {
            setFile(result.assets[0]); // Ensure setFile is correctly handling assets
        }
    };

    const isLocalFile = (file) => {
        if (!file) return null;
        if (typeof file === 'object') return true;

        return false;
    };

    const getFileType = (file) => {
        if (!file) return null;

        if (isLocalFile(file)) {
            return file.type;
        }

        // Check if the remote file is an image or video
        if (file.includes('postImage')) {
            return 'image';
        }


        return 'video'; // Handle unknown cases
    };

    const getFileUri = (file) => {
        if (!file) return null;
        if (isLocalFile(file)) {
            return file.uri;
        }

        return getSupabaseFileUrl(file)?.uri;
    }

    const onSubmit = async () => {
        if (!bodyRef.current && !file) {
            Alert.alert('Post', "Please choose an image or add post body");
            return
        }

        let data ={
            file,
            body: bodyRef.current,
            userId:user?.id,
        }

        // create post
        setLoading(true)
        let res = await createOrUpdatePost(data)
        setLoading(false)
        console.log('New Post Res (New Post Page):', res);
        if (res.success) {
            setFile(null);
            bodyRef.current = '',
            editorRef.current?.setContentHTML('')
            router.back()
        }else{
            Alert.alert('Post',res.msg)
        }
        

    }




    console.log('file uri: ', getFileUri(file));
    return (
        <ScreenWrapper bg={"white"}>
            <View style={styles.container}>
                <Header title={'Create Post'} />
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    <View style={styles.header}>
                        <Avatar
                            uri={user?.image}
                            size={hp(6.5)}
                            rounded={theme.radius.xl}
                        />

                        <View style={{ gap: 2 }}>
                            <Text style={styles.username}>
                                {
                                    user && user.name
                                }
                            </Text>
                            <Text style={styles.publicText}>
                                Public
                            </Text>
                        </View>
                    </View>
                    <View>
                        <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body} />
                    </View>

                    {
                        file && (
                            <View style={styles.file}>
                                {
                                    getFileType(file) == 'video' ? (
                                        <Video style={{ flex: 1 }} source={{ uri: getFileUri(file) }} useNativeControls resizeMode='cover' isLooping />
                                    ) : (<Image source={{ uri: getFileUri(file) }} resizeMode='cover' style={{ flex: 1 }} />)
                                }

                                <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                                    <Icon name='delete' size={20} color="white" />
                                </Pressable>
                            </View>
                        )
                    }

                    <View style={styles.media}>
                        <Text style={styles.addImageText}>Add to your post</Text>
                        <View style={styles.mediaIcons}>
                            <TouchableOpacity onPress={() => onPick(true)}>
                                <Icon name="image" size={30} color={theme.colors.dark} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPick(false)}>
                                <Icon name="video" size={33} color={theme.colors.dark} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Button buttonStyle={{ height: hp(6.2) }} title="Post" loading={loading} hasShadow={false} onPress={()=>onSubmit()} />
            </View>
        </ScreenWrapper>
    )
}

export default NewPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        paddingHorizontal: wp(4),
        gap: 15,
    },


    title: {
        // marginBottom: 10,
        fontSize: hp(2.5),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
        textAlign: 'center',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    username: {
        fontSize: hp(2.2),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },

    avatar: {
        height: hp(6.5),
        width: hp(6.5),
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous', // Assuming this is valid
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },

    publicText: {
        fontSize: hp(1.7),
        fontWeight: theme.fonts.medium, // Fixed typo: "fontweight" → "fontWeight"
        color: theme.colors.textLight,
    },

    media: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        padding: 12,
        paddingHorizontal: 18,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray, // Assuming gray is an object with shades
    },
    mediaIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    addImageText: {
        fontSize: hp(1.9),
        fontWeight: theme.fonts.semibold, // Fixed typo: fontweight -> fontWeight
        color: theme.colors.text,
    },

    imageIcon: {
        // backgroundColor: theme.colors.gray, (uncomment if needed)
        borderRadius: theme.radius.md,
        // padding: 6, (uncomment if needed)
    },
    file: {
        height: hp(30),
        width: '100%',
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        borderCurve: 'continuous', // Assuming this is a valid property
    },

    video: {}, // Define this if needed

    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 18,
        padding: 7,
        borderRadius: 15,
        backgroundColor: 'rgba(255,0,0,0.6)',
        // shadowColor: theme.colors.textLight,
        // shadowOffset: { width: 3, height: 3 }, // Fixed shadowOffset syntax
        // shadowOpacity: 0.6,
        shadowRadius: 8, // Fixed incorrect spelling
    },

})