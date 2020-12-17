import React from "react";
import { Header, View, Title, Body } from "native-base";
import ResistanceList from "../../components/resistance/ResistanceList";

import { resistanceStyles } from './Resistance.style';
import { ResistanceModel } from '../../domainlogic/models/ResistanceModel';

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/index";
import { profileSelectors } from "../../redux/profiles";
import { resistanceSelectors, getResistanceList, ThunkActionDispatch as ResistanceThunkActionDispatch } from "../../redux/resistance";

interface ResistanceReduxState {
  isDarkMode: boolean;
  resistances: ResistanceModel[];
}

const Resistance: React.FC = () => {
  const dispatch = useDispatch<ResistanceThunkActionDispatch>();
  const resistanceReduxState = useSelector<AppState, ResistanceReduxState>(state => {
    const isDarkMode = profileSelectors.checkIsDarkMode(state);
    const resistances = resistanceSelectors.getResistances(state);

    return { isDarkMode, resistances };
  });
  const { isDarkMode, resistances } = resistanceReduxState;

  const [styles, setStyles] = React.useState(resistanceStyles());

  // Update styles on theme change
  React.useEffect(() => {
    setStyles(resistanceStyles());
  }, [isDarkMode, setStyles]);

  // Get list of resistances on initial load
  React.useEffect(() => {
    dispatch(getResistanceList());
  }, []);


  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Body><Title style={styles.headerText}>Resistances</Title></Body>
      </Header>
      <ResistanceList isDarkMode={isDarkMode} resistances={resistances} />
    </View>
  );
};

export default Resistance;
