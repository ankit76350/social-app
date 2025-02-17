import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  try {


    const { data, error } = await supabase.from('notifications').insert(notification).select().single()

    if (error) {
      console.log("Notification error (Notification servive file):", error);
      return { success: false, msg: "Something went wrong in notification" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Notification error (Notification servive file):", error);
    return { success: false, msg: "Something went wrong in notification" };
  }
};


export const fetchNotifications = async (receiverId) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`* , sender: senderId(id, name, image)`)
        .eq('receiverId', receiverId)
        .order("created_at", { ascending: false})
  
      if (error) {
        console.log('fetchNotification error (Notification Service File): ', error);
        return { success: false, msg: 'Could not fetch the notifications' };
      }
  
      return { success: true, data: data };
    } catch (error) {
      console.log('fetchNotification error (Notification Service File): ', error);
      return { success: false, msg: 'Could not fetch the notifications' };
    }
  };