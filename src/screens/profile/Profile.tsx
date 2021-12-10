import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Loader from "../../components/loader/Loader";
import { getProfileByUsername } from "../../services/github.service";
import { User } from "../../types/user";

const Profile = ({ route, navigation }: any) => {
  const { username } = route.params;
  const [currentProfile, setCurrentProfile] = useState<User>();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getProfileByUsername(username)
      .then((user) => {
        if (user.status && user.status === 404) {
          setCurrentProfile(undefined);
          setisLoading(false);
        } else {
          setCurrentProfile(user);
          setisLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleFollow = () => {
    if (currentProfile) {
      const redirect = currentProfile.html_url
        ? currentProfile.html_url
        : `https://github.com/${username}`;
      Linking.openURL(redirect);
    }
  };
  const handleViewBlog = () => {
    if (currentProfile && currentProfile.blog) {
      if (!currentProfile.blog.startsWith("http")) {
        Linking.openURL("https://" + currentProfile.blog);
      } else {
        Linking.openURL(currentProfile.blog);
      }
    }
  };
  // console.log(currentProfile);

  if (!currentProfile) {
    navigation.navigate("NotFound", { username });
    return <></>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background.jpg")}
        style={styles.header}
      >
        <Image
          style={styles.avatar}
          source={{ uri: currentProfile.avatar_url }}
        />
        <Text style={styles.name}>{currentProfile.name}</Text>
        <Text style={styles.login}>@{currentProfile.login}</Text>
        <Text style={styles.desc}>{currentProfile.bio}</Text>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={handleFollow}
        >
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableHighlight>
      </ImageBackground>
      <View style={styles.statContainer}>
        <View style={styles.statItemContainer}>
          <Text style={styles.dataNumber}>
            {currentProfile.public_repos && currentProfile.total_private_repos
              ? currentProfile.public_repos + currentProfile.total_private_repos
              : currentProfile.public_repos}
          </Text>
          <Text>repositories</Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text style={styles.dataNumber}>
            {currentProfile.total_private_repos
              ? currentProfile.total_private_repos
              : 0}
          </Text>
          <Text>stars</Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text style={styles.dataNumber}>
            {currentProfile.followers ? currentProfile.followers : 0}
          </Text>
          <Text>followers</Text>
        </View>

        <View style={styles.statItemContainer}>
          <Text style={styles.dataNumber}>
            {currentProfile.following ? currentProfile.following : 0}
          </Text>
          <Text>following</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, width: "100%" }}>
        <Text style={styles.detailsLabel}>Details</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsKey}>Twitter: </Text>
          <Text style={styles.detailsValue}>
            {currentProfile.twitter_username
              ? `@${currentProfile.twitter_username}`
              : "-"}
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsKey}>Email: </Text>
          <Text style={styles.detailsValue}>
            {currentProfile.email ? `${currentProfile.email}` : "-"}
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsKey}>Type: </Text>
          <Text style={styles.detailsValue}>
            {currentProfile.type ? `${currentProfile.type}` : "-"}
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsKey}>Location: </Text>
          <Text style={styles.detailsValue}>
            {currentProfile.location ? `${currentProfile.location}` : "-"}
          </Text>
        </View>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsKey}>Company: </Text>
          <Text style={styles.detailsValue}>
            {currentProfile.company ? `${currentProfile.company}` : "-"}
          </Text>
        </View>
      </View>
      {currentProfile.blog && currentProfile.blog !== "" ? (
        <View
          style={{
            ...styles.detailsItem,
            ...{ justifyContent: "center", marginTop: 0, marginBottom: 30 },
          }}
        >
          <TouchableHighlight
            style={styles.blogButtonContainer}
            onPress={handleViewBlog}
          >
            <Text style={styles.blogButtonText}>View blog</Text>
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#2B2B2B",
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  login: {
    fontSize: 13,
    color: "#D3E4CD",
    fontStyle: "italic",
  },
  desc: {
    fontSize: 18,
    color: "#99A799",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#4AA96C",
    position: "absolute",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    bottom: -20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  blogButtonContainer: {
    backgroundColor: "#222831",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  blogButtonText: {
    color: "#FFF",
    fontSize: 15,
  },
  statContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  statItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dataNumber: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    marginTop: 20,
  },
  detailsLabel: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  details: {
    backgroundColor: "#F4F9F9",
    width: "90%",
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailsItem: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  detailsKey: {
    fontSize: 15,
    color: "#787A91",
  },
  detailsValue: {
    fontSize: 15,
    color: "#000",
    fontWeight: "700",
  },
});
