import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostDetailsCard from "../../components/PostDetailsCard";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PostDetailsScreen = () => {
  const params = useLocalSearchParams();
  const { data: postParam } = params;
  console.log(postParam, "postParam");

  const post = JSON.parse(postParam as string);
  const { posts } = useSelector((state: any) => state.post);
  const [data, setData] = useState(post);

  useEffect(() => {
    if (posts) {
      const d = posts.find((i: any) => i._id === post._id);
      setData(d);
    }
  }, [posts]);

  return (
    <SafeAreaView>
      <View className="relative flex-col justify-between">
        <View className="h-full">
          <View className="px-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2223/2223615.png",
                }}
                height={25}
                width={25}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mb-[70px]"
          >
            <PostDetailsCard item={data} postId={data._id} />
            <View>
              {data?.replies?.map((i: any, index: number) => {
                return (
                  <PostDetailsCard
                    item={i}
                    key={index}
                    isReply={true}
                    postId={post._id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View className="absolute bottom-0 flex-row w-full justify-center bg-white h-[70px] items-center">
          <TouchableOpacity
            className="w-[92%] bg-[#00000026] h-[45px] rounded-[40px] flex-row items-center"
            onPress={() =>
              router.push({
                pathname: "/createReplies",
                params: { item: JSON.stringify(post) },
              })
            }
          >
            <Image
              source={{ uri: post.user.avatar.url }}
              width={30}
              height={30}
              borderRadius={100}
              className="ml-3 mr-3"
            />
            <Text className="text-[16px] text-[#0000009b]">
              Reply to {post.user.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;
