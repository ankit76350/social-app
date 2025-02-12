import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';
import { decode } from 'base64-arraybuffer';
import { supabaseUrl } from '../constants';

export const getUserImageSrc = imagePath => {
    if (imagePath) {
        return getSupabaseFileUrl(imagePath)
    } else {
        return require('../assets/images/defaultUser.png')
    }
}
// 'https://bssnkegvsihssksaejoz.supabase.co/storage/v1/object/public/uploads/profiles/1739336284477.png'

export const getSupabaseFileUrl = filePath => {
    if (filePath) {
        return { uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}` }
    }
    return null
}

export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);

        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64
        });

        let imageData = decode(fileBase64); // Convert Base64 to ArrayBuffer if required

        let { data, error } = await supabase
            .storage
            .from('uploads') // 'uploads' is the bucket name that you have created
            .upload(fileName, imageData, {
                cacheControl: '3600',
                upsert: false, // Set to true if you want to overwrite existing files
                contentType: isImage ? 'image/*' : 'video/*' // Use specific MIME types
            });

        if (error) {
            console.log('File upload error:', error);
            return { success: false, msg: 'Could not upload media' };
        }

        console.log('Upload successful Image/File/Video (imageService):', data);
        return { success: true, data: data.path };

    } catch (error) {
        console.log('File upload error: ', error);
        return { success: false, msg: 'Could not upload media' };
    }
};

export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};
