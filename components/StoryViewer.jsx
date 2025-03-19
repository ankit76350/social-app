import React, { useState } from "react";
import { Modal, View, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
// import Carousel from 'react-native-snap-carousel';
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const StoryViewer = ({ visible, onClose, stories }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => {
    return item.type === "image" ? (
      <Image source={{ uri: item.url }} style={styles.media} />
    ) : (
      <Video
        source={{ uri: item.url }}
        style={styles.media}
        resizeMode="cover"
        controls
        autoplay
      />
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        {/* <Carousel
          data={stories}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => setActiveIndex(index)}
        /> */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={{ uri: "https://img.icons8.com/ios/50/ffffff/multiply.png" }} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default StoryViewer;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    media: {
      width: width,
      height: height,
    },
    closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: "white",
    },
  });