import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userService'

const _layout = () => {
  return (
    <AuthProvider>
    
    <MainLayout/>
    </AuthProvider>
  )
}
const MainLayout = () => {
  const {setAuth , setUserData} = useAuth()
  const router = useRouter()
  useEffect(()=>{

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session log: ',session?.user?.id)

      if (session) {
        setAuth(session?.user)
        updateUserData(session?.user)
        
        router.replace('/Home')
        
      }else{
        setAuth(null)
        router.replace('/Welcome')
      }
    })


  },[])

  const updateUserData =  async (user) =>{
    let res = await getUserData(user?.id);
    if (res.success) {
      setUserData(res.data)
    }
    console.log('got user data(_layout page): ', res)
  }
   
  return (
   <Stack
   screenOptions={{
    headerShown:false
   }}
   />
  )
}

export default _layout