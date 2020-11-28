import React from "react";
import { Text, View, Switch } from "react-native";
import { profileStyles } from "./Profile.styles";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/index";
import { profileActions, profileSelectors } from "../../redux/profiles";
import { Style, ThemeName } from "../../styles/style";

interface ProfileReduxState {
  isDarkMode: boolean;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const updateDarkModeState = async (value: boolean) => {
    await Style.setCurrentTheme(value ? ThemeName.DARK : ThemeName.LIGHT);
    dispatch(profileActions.receiveProfile(value));
  };

  const profileReduxState = useSelector<AppState, ProfileReduxState>(state => {
    const isDarkMode = profileSelectors.checkIsDarkMode(state);

    return { isDarkMode };
  });
  const [styles, setStyles] = React.useState(profileStyles());

  const { isDarkMode } = profileReduxState;

  React.useEffect(() => {
    setStyles(profileStyles());
  }, [isDarkMode, setStyles]);

  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
      <Switch
        trackColor={{ false: "darkgrey", true: "lightgrey" }}
        thumbColor="#f4f3f4"
        ios_backgroundColor="darkgrey"
        onValueChange={updateDarkModeState}
        value={isDarkMode}
      />
    </View>
  );
};

export default Profile;
