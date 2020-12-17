// Copyright FitBook

import React from "react";
import { useDispatch } from "react-redux";
import { Style, ThemeName } from "./styles/style";
import { profileActions } from "./redux/profiles";

interface AppInitProps {
  children: React.ReactElement;
}

const AppInit: React.FC<AppInitProps> = props => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchConfigFromStorage = async () => {
      await Style.computeCurrentTheme();
      const isDarkMode = Style.getCurrentTheme() === ThemeName.DARK;
      dispatch(profileActions.receiveProfile(isDarkMode));
      setIsInitialized(true);
    };

    fetchConfigFromStorage();
  }, [dispatch, setIsInitialized]);

  if (isInitialized) {
    return props.children;
  }

  return null;
};

export default AppInit;
