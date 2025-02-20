import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import React from 'react'
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';

const Story = () => {
    const posts = [
        { "id": 1, "name": "Ankit", "image": "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 2, "name": "Shiva", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 3, "name": "Rahul", "image": "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 4, "name": "Priya", "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 5, "name": "Neha", "image": "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 6, "name": "Vikas", "image": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 7, "name": "Amit", "image": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 8, "name": "Ravi", "image": "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 9, "name": "Pooja", "image": "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww" },
        { "id": 10, "name": "Suman", "image": "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 11, "name": "Manoj", "image": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 12, "name": "Kiran", "image": "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 13, "name": "Sunil", "image": "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 14, "name": "Meera", "image": "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 15, "name": "Deepak", "image": "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 16, "name": "Ramesh", "image": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" },
        { "id": 17, "name": "Suresh", "image": "https://media.istockphoto.com/id/1277971635/photo/portrait-of-a-smiling-man-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=CnPwvagPlklsAjejUNkuKv_QXtaXPYFQ64AQYb-IAjA=" },
        { "id": 18, "name": "Alok", "image": "https://media.istockphoto.com/id/1951976038/photo/photo-of-young-women-in-winter-wear-standing-on-yellow-background-stock-photo.jpg?s=612x612&w=0&k=20&c=9c980xm-B_8rkyFFIz0O1-zpH4r2gAzXJ4C14boVAIo=" },
        { "id": 19, "name": "Gaurav", "image": "https://media.istockphoto.com/id/1176848710/photo/businessman-making-video-call-looking-at-camera-and-talking.jpg?s=612x612&w=0&k=20&c=AQDZDL--JSOBEXp-_pAhLcMVfxQ6F5bpQlBXqdl_ks4=" },
        { "id": 20, "name": "Nisha", "image": "https://media.istockphoto.com/id/1951711154/photo/photo-of-young-women-in-winter-wear-standing-on-yellow-background-stock-photo.jpg?s=612x612&w=0&k=20&c=nUgDW26lW0Y-qTbMuUOVLadq_kuX3CHVUGJow9n_bOM=" },
        { "id": 21, "name": "Sneha", "image": "https://media.istockphoto.com/id/1992374358/photo/portrait-of-cheerful-positive-modern-woman-using-phone-isolated-yellow-background-stock-photo.jpg?s=612x612&w=0&k=20&c=yIp4t2OHKXS3VZJ-aL0rG3mr6tGLJP2rWjX5lss-LcE=" },
        { "id": 22, "name": "Varun", "image": "https://media.istockphoto.com/id/1345109800/photo/young-beautiful-woman-stock-photo.jpg?s=612x612&w=0&k=20&c=dB00lp8w1puL-F9AiGPg2DHoJI7ZzAbRCe_vGqQnZwI=" },
        { "id": 23, "name": "Ritika", "image": "https://media.istockphoto.com/id/2190330110/photo/senior-sikh-man-in-casual-wear-thinking-pointing-or-expressing-surprise-in-white-background.jpg?s=612x612&w=0&k=20&c=yjTlkg8G5r9lxUWNuf1T03ZGfqZxnh7Gx9shCa0OZvw=" },
        { "id": 24, "name": "Arjun", "image": "https://media.istockphoto.com/id/1180926773/photo/studio-waist-up-portrait-of-a-beautiful-businesswoman-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=ksj6EMM6NiETqyOptZ43dR3dKT57gdoL7RnehQ0spBk=" },
        { "id": 25, "name": "Kavita", "image": "https://media.istockphoto.com/id/2105399620/photo/smiling-businessman-using-laptop-in-modern-office.jpg?s=612x612&w=0&k=20&c=7yzxViaUvotQ-tZBOpH4i2xcelTOrUceWwZoryVy0E4=" }
    ]

    console.log("Posts in Story:", posts); // Debugging log

    return (
        <>
            <View style={[{ height: 120, width: "100%" }]}>
                <FlatList
                    horizontal
                    data={posts}
                    renderItem={({ item, index }) => <PostCard item={item} index={index} /> }
                    keyExtractor={(item) => item.id.toString()}

                />
            </View>
        </>
    );
};


export default Story


const PostCard = ({ item, index }) => {
    return (
        <View style={[styles.contanier, { height: '100%' }]}>
            <View style={[styles.imageContanier, { height: 90, width: 90 }]}>
                {item.image && (
                    <Image source={{ uri: item.image }} style={[styles.image, { width: 85, height: 85 }]} />
                )}

                {index == 0 && (
                    <View style={styles.plusIconContainer}>
                        <Image source={require('../../assets/icons/plus.png')} style={styles.plusIcon} />
                    </View>
                )}
                {index == 0 ? (
                    <Text style={[styles.userName, { textAlign: 'center' }]}>
                        Your Story
                    </Text>
                ): (
                    <Text style={[styles.userName, { textAlign: 'center' }]}>
                        {item.name}
                    </Text>
                )}

            </View>
        </View>
    );
};




const styles = StyleSheet.create({

    contanier: {
        flex: 1,
        marginLeft: 5,
    },
    imageContanier: {
        // flex: 1,
    },

    image: {
        borderWidth: 3,
        borderColor: theme.colors.primary,
        borderRadius: 50,
        padding: 2,
    },
    userName: {
        margin: 1,
        padding: 1
    },
    plusIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 2,
    },
    plusIcon: {
        width: 20,
        height: 20,
    },
})


// import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';
// import { hp, wp } from '../../helpers/common';
// import { theme } from '../../constants/theme';

// const Story = () => {
//     const posts = [
//         { "id": 1, "name": "Ankit", "image": "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" },
//         { "id": 2, "name": "Shiva", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" }
//     ];

//     return (
//         <FlatList
//             data={posts}
//             horizontal
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item, index }) => (
//                 <View style={styles.itemContainer}>
//                     <Image source={{ uri: item.image }} style={styles.image} />
//                     {index === 0 && (
//                         <View style={styles.plusIconContainer}>
//                             <Image source={require('../../assets/icons/plus.png')} style={styles.plusIcon} />
//                         </View>
//                     )}
//                     <Text style={styles.name}>{item.name}</Text>
//                 </View>
//             )}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     itemContainer: {
//         alignItems: 'center',
//         marginHorizontal: 10,
//     },
//     image: {
//         width: wp(20),
//         height: wp(20),
//         borderRadius: wp(10),
//     },
//     name: {
//         marginTop: 5,
//         color: theme.colors.text,
//         fontSize: 14,
//     },
//     plusIconContainer: {
//         position: 'absolute',
//         bottom: 5,
//         right: 5,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 2,
//     },
//     plusIcon: {
//         width: 20,
//         height: 20,
//     },
// });

// export default Story;
