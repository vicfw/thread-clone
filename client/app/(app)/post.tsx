import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, getAllPosts } from "../../redux/actions/postAction";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PostScreen = () => {
  const { user } = useSelector((state: any) => state.user);
  const { isSuccess, isLoading } = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === "" &&
      replies[0].image === ""
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      router.back();
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle("");
    setImage("");
  }, [isSuccess]);

  const [replies, setReplies] = useState([
    {
      title: "",
      image: "",
      user,
    },
  ]);

  const handleTitleChange = (index: number, text: string) => {
    setReplies((prevPost) => {
      const updatedPost = [...prevPost];
      updatedPost[index] = { ...updatedPost[index], title: text };
      return updatedPost;
    });
  };

  const uploadImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setReplies((prevPost) => {
        const updatedPost = [...prevPost];
        updatedPost[index] = {
          ...updatedPost[index],
          // @ts-ignore
          image: "data:image/jpeg;base64," + result?.assets[0].base64,
        };
        return updatedPost;
      });
    }
  };

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== "" ||
      replies[activeIndex].image !== ""
    ) {
      setReplies((prevPost) => [...prevPost, { title: "", image: "", user }]);
      setActiveIndex(replies.length);
    }
  };

  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies];
      updatedPost.splice(index, 1);
      setReplies(updatedPost);
      setActiveIndex(replies.length - 1);
    } else {
      setReplies([{ title: "", image: "", user }]);
    }
  };

  const addFreshNewThread = () => {
    if (title !== "" || image !== "") {
      setReplies((prevPost) => [...prevPost, { title: "", image: "", user }]);
      setActiveIndex(replies.length);
    }
  };

  const postImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage("data:image/jpeg;base64," + result.assets[0].base64);
    }
  };

  const createPost = () => {
    if (title !== "" || (image !== "" && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-row items-center m-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2961/2961937.png",
            }}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Text className="pl-4 text-[20px] font-[500] text-[#000]">
          New Thread
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-3 flex-1 justify-between ">
          <View>
            {/* create post */}
            <View className="mt-3 flex-row justify-between">
              <View className="flex-row">
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 40, height: 40 }}
                  borderRadius={100}
                />
                <View className="pl-3">
                  <View className=" flex-row justify-between">
                    <Text className="text-[20px] font-[400] text-black">
                      {user?.name}
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Start a thread..."
                    placeholderTextColor={"#000"}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    className="mt-1 text-[#000] text-[16px]"
                  />
                  <TouchableOpacity className="mt-2" onPress={postImageUpload}>
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/10857/10857463.png",
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      tintColor={"#000"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {image && (
              <View className="m-2">
                <Image
                  source={{ uri: image }}
                  width={200}
                  height={300}
                  resizeMethod="auto"
                  alt=""
                />
              </View>
            )}
            {replies.length === 0 && (
              <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                <Image
                  source={{ uri: user?.avatar.url }}
                  style={{ width: 30, height: 30 }}
                  borderRadius={100}
                />
                <Text className="pl-3 text-black" onPress={addFreshNewThread}>
                  Add to thread ...
                </Text>
              </View>
            )}

            {replies.map((item, index) => (
              <View key={index}>
                <View className="mt-3 flex-row justify-between">
                  <View className="flex-row">
                    <Image
                      source={{ uri: user?.avatar.url }}
                      style={{ width: 40, height: 40 }}
                      borderRadius={100}
                    />
                    <View className="pl-3">
                      <View className=" flex-row justify-between">
                        <Text className="text-[20px] font-[400] text-black">
                          {user?.name}
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Start a thread..."
                        placeholderTextColor={"#000"}
                        value={item.title}
                        onChangeText={(text) => handleTitleChange(index, text)}
                        className="mt-2 text-[#000] text-[16px]"
                      />
                      <TouchableOpacity
                        className="mt-2"
                        onPress={() => uploadImage(index)}
                      >
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/10857/10857463.png",
                          }}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => removeThread(index)}>
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2961/2961937.png",
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {item.image && (
                  <View className="m-2">
                    <Image
                      source={{ uri: item.image }}
                      width={200}
                      height={300}
                      resizeMethod="auto"
                      alt=""
                    />
                  </View>
                )}
                {index === activeIndex && (
                  <View className="flex-row m-3 w-full items-start mt-5 opacity-7">
                    <Image
                      source={{ uri: user?.avatar.url }}
                      style={{ width: 30, height: 30 }}
                      borderRadius={100}
                    />
                    <Text className="pl-3 text-black" onPress={addNewThread}>
                      Add to thread ...
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="p-2 flex-row justify-between">
        <Text className="text-black px-1 py-1">Anyone can reply</Text>
        <TouchableOpacity onPress={createPost}>
          <Text className="text-[#1977f2]">Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
