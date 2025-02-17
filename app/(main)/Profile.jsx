import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { hp, wp } from "../../helpers/common.js";
import Icon from '../../assets/icons/Index.jsx';
import { theme } from '../../constants/theme.js';
import { supabase } from '../../lib/supabase.js';
import Avatar from '../../components/Avatar.jsx';
import { fetchPosts } from '../../services/postService.js';
import PostCard from '../../components/PostCard.jsx';
import Loading from '../../components/Loading.jsx';

var limit = 0;
const Profile = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();

    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)


    const onLogout = async () => {
        // setAuth(null); //this null thing is present in the welcome page
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert("Sign Out", "Error signing out!")
        }
    }

    const getPosts = async () => {
        console.log("fetching posts: ", limit);
        if (!hasMore) {
            return null
        }
        limit = limit + 10;

        let res = await fetchPosts(limit, user.id);
        if (res.success) {
            if (posts.length == res.data.length) {
                setHasMore(false)
            }
            setPosts(res.data)
        }

        // console.log("Ankit Kumar Post",res);
        // console.log("Ankit Kumar Post User",res.data[0].user);

    }




    const handleLogout = () => {

        Alert.alert('Confirm', "Are you sure you want to log out?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Modal cancelled'),
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: () => onLogout(),
                style: 'destructive'
            }
        ])

    }

    return (
        <ScreenWrapper bg="white">
            {/* <UserHeader user={user} router={router} handleLogout={handleLogout} /> */}
            <FlatList
                data={posts}
                ListHeaderComponent={<UserHeader user={user} router={router} handleLogout={handleLogout} />}
                ListHeaderComponentStyle={{marginBottom:30}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <PostCard
                    item={item}
                    currentUser={user}
                    router={router}
                />
                }
                onEndReached={() => {
                    console.log('End of the page');
                    getPosts()

                }}
                onEndReachedThreshold={0}

                ListFooterComponent={(

                    hasMore ? (<View style={{ marginVertical: posts.length == 0 ? 100 : 30 }}>
                        <Loading />
                    </View>) : (<View style={{ marginVertical: 30 }}>
                        <Text style={styles.noPosts}>No more posts</Text>
                    </View>)
                )}
            />
            
        </ScreenWrapper>
    );
};

const UserHeader = ({ user, router, handleLogout }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
            <View>
                <Header title="Profile" mb={30} />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name='logout' color={theme.colors.rose} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{ gap: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.image}
                            size={hp(15)}
                            rounded={theme.radius.xxl * 1.4}
                            style={{ borderWidth: 2 }}
                        />
                        <Pressable style={styles.editIcon} onPress={() => router.push('/EditProfile')}>
                            <Icon name='edit' strokeWidth={2.5} size={20} />
                        </Pressable>

                    </View>

                    {/* username and address */}


                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <Text style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.infoText}>{user?.address}</Text>
                    </View>

                    {/* Email, phone, bio */}
                    <View style={{ gap: 10 }}>
                        <View style={styles.info}>
                            <Icon name="mail" size={20} color={theme.colors.textLight} />
                            <Text style={styles.infoText}>{user?.email}</Text>
                        </View>
                    </View>
                    {user && user.phoneNumber && (<View style={{ gap: 10 }}>
                        <View style={styles.info}>
                            <Icon name="call" size={20} color={theme.colors.textLight} />
                            <Text style={styles.infoText}>{user?.phoneNumber}</Text>
                        </View>
                    </View>)}

                    {
                        user && user.bio && (
                            <Text style={styles.infoText}>{user?.bio}</Text>
                        )
                    }

                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20,
    },
    headerShape: {
        width: wp(100),
        height: hp(20),
    },
    avatarContainer: {
        height: hp(15),
        width: hp(15),
        alignSelf: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },

    userName: {
        fontSize: hp(3),
        fontWeight: '500',
        color: theme.colors.textDark,

    },

    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },

    infoText: {
        fontSize: hp(1.6),
        fontWeight: '500',
        color: theme.colors.textLight,
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2',
    },
    listStyle: {
        paddingHorizontal: wp(4),
        paddingBottom: 30,
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text,
    },
});

