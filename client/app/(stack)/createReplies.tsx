import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllPosts } from "../../redux/actions/postAction";
import getTimeDuration from "../../utils/timeGenrator";
import { baseUrl } from "../../constants/URL";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const CreateRepliesScreen = () => {
  const params = useLocalSearchParams();
  const { postId, item } = params;
  const post = JSON.parse(item as string);

  const { user, token } = useSelector((state: any) => state.user);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const ImageUpload = async () => {
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

  const time = post.createdAt;
  const formattedDuration = getTimeDuration(time);

  const createReplies = async () => {
    if (!postId || post._id) {
      await axios
        .put(
          `${baseUrl}/add-replies`,
          {
            postId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          getAllPosts()(dispatch);
          router.push({
            pathname: "/postDetails",
            params: { data: JSON.stringify(res.data.post) },
          });
          setTitle("");
          setImage("");
        });
    } else {
      await axios
        .put(
          `${baseUrl}/add-reply`,
          {
            postId: postId ?? post._id,
            replyId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          router.push({
            pathname: "/postDetails",
            params: { data: JSON.stringify(res.data.post) },
          });
          setTitle("");
          setImage("");
        });
    }
  };
  return (
    <SafeAreaView>
      <View className="flex-row items-center p-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2961/2961937.png",
            }}
            width={25}
            height={25}
          />
        </TouchableOpacity>
        <Text className="text-[20px] left-4 font-[600] text-[#000]">Reply</Text>
      </View>
      <View className="h-[88vh] justify-between flex-col">
        <ScrollView className="relative" showsVerticalScrollIndicator={false}>
          <View className="flex-row w-full justify-between p-3">
            <View className="flex-row items-center">
              <Image
                source={{ uri: post.user?.avatar?.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
              <View className="pl-3">
                <Text className="text-black font-[500] text-[18px]">
                  {post.user.name}
                </Text>
                <Text className="text-black font-[500] text-[16px]">
                  {post.title}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#000000b6]">{formattedDuration}</Text>
              <TouchableOpacity>
                <Text className="text-[#000] pl-4 font-[700] mb-[8px]">
                  ...
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="ml-[50px] my-3">
            {post.image && (
              <Image
                source={{ uri: post.image.url }}
                style={{
                  width: "90%",
                  aspectRatio: 1,
                  borderRadius: 10,
                  zIndex: 1111,
                }}
                resizeMode="contain"
              />
            )}
          </View>
          {post.image ? (
            <View className="absolute top-[125] left-8 h-[75%] w-[1px] bg-[#00000017]" />
          ) : (
            <View className="absolute top-12 left-5 h-[60%] w-[1px] bg-[#00000017]" />
          )}

          <View className="p-3">
            <View className="flex-row">
              <Image
                source={{ uri: user.avatar.url }}
                width={40}
                height={40}
                borderRadius={100}
              />
              <View className="pl-3">
                <Text className="text-black font-[500] text-[18px]">
                  {user.name}
                </Text>
                <TextInput
                  placeholder={`Reply to ${post.user.name}...`}
                  placeholderTextColor={"#666"}
                  className="mt-[-5px] ml-1 text-black"
                  value={title}
                  onChangeText={setTitle}
                />
                <TouchableOpacity className="mt-2" onPress={ImageUpload}>
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
            <View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "85%",
                    aspectRatio: 1,
                    borderRadius: 10,
                    zIndex: 1111,
                    marginLeft: 45,
                    marginVertical: 20,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View>
          <View className="p-2">
            <View className="w-full flex-row justify-between">
              <Text className="left-3 text-[#000]">Anyone can reply</Text>
              <TouchableOpacity onPress={createReplies}>
                <Text className="text-[#1977f2] mr-[10px]">Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateRepliesScreen;
