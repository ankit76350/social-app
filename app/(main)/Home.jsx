import { View, Text, Button, Alert, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
// import Button from '../../components/Button'
import { hp, wp } from "../../helpers/common";
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons/Index'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'

const Home = () => {
  const { user, setAuth } = useAuth()
  const router = useRouter()

  console.log("user", user);



  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>

        {/* Header style={styles.container}*/}


        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push('/Notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
            <Pressable onPress={() => router.push('/NewPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
            <Pressable onPress={() => router.push('/Profile')}>
              <Avatar uri={user?.image} size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2 }}
              />
              {/* <Icon name="user" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} /> */}
            </Pressable>
          </View>




        </View>



      </View>
    </ScreenWrapper>
  )
}

export default Home


const styles = StyleSheet.create({

  container: {
    flex: 1,
    // paddingHorizontal: wp(4)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.colors.bold, // Assuming `theme.fonts.bold` is not directly usable
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
  },

  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: theme.colors.bold, // Assuming `theme.fonts.bold` is not directly usable
  },


})

