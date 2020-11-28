import React from "react";
import { Container, Content } from "native-base";

import CurrentSession from "../../components/dashboard/CurrentSession";
import Header from "../../components/dashboard/Header";
import FabSelector from "../../components/common/FabSelector";
import AddEntry from "../../components/common/AddEntry";
import { dashboardStyles } from './Dashboard.style';

import { ResistanceModel } from '../../domainlogic/models/ResistanceModel';

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/index";
import { profileSelectors } from "../../redux/profiles";
import { ThunkActionDispatch as ResistanceThunkActionDispatch, createResistance, getResistanceTypeList, resistanceSelectors } from "../../redux/resistance";


interface DashboardReduxState {
  isDarkMode: boolean;
  resistanceTypes: string[];
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<ResistanceThunkActionDispatch>();
  const dashboardReduxState = useSelector<AppState, DashboardReduxState>(state => {
    const isDarkMode = profileSelectors.checkIsDarkMode(state);
    const resistanceTypes = resistanceSelectors.getResistanceTypes(state);

    return { isDarkMode, resistanceTypes };
  });
  const { isDarkMode, resistanceTypes } = dashboardReduxState;

  const [styles, setStyles] = React.useState(dashboardStyles());
  const [showCreateResistanceModal, setShowCreateResistanceModal] = React.useState<boolean>(false);
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] = React.useState<boolean>(false);

  const addResistance = (data: ResistanceModel) => {
    dispatch(createResistance(data));
  };

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [isDarkMode, setStyles]);

  const showCreateResistance = () => {
    dispatch(getResistanceTypeList());
    setShowCreateResistanceModal(true);
  };

  return (
    <>
      {showCreateResistanceModal &&
        <AddEntry
          isDarkMode={isDarkMode}
          onClose={() => setShowCreateResistanceModal(false)}
          addResistance={addResistance}
          resistanceTypes={resistanceTypes}
        />}
      <Container style={styles.container}>
        <Header isDarkMode={isDarkMode} />
        <Content>
          <CurrentSession isDarkMode={isDarkMode} />
        </Content>
        <FabSelector
          isDarkMode={isDarkMode}
          showCreateResistance={showCreateResistance}
          showCreateWorkout={setShowCreateWorkoutModal} />
      </Container>
    </>
  );
};

export default Dashboard;
