import { View, Text , Button, Alert} from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth} from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
// import Button from '../../components/Button'

const Home = () => {
    const {user, setAuth} = useAuth()

    console.log("user",user);
    

    const onLogout = async () => {
        // setAuth(null); //this null thing is present in the welcome page
        const {error} =  await supabase.auth.signOut()

        if (error) {
            Alert.alert("Sign Out", "Error signing out!")
        }
    }
  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="Logout" onPress={onLogout}/>
    </ScreenWrapper>
  )
}

export default Home