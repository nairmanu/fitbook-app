import React from "react";
import { Container, Content } from "native-base";

import CurrentSession from "../../components/dashboard/CurrentSession";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <CurrentSession />
      </Content>
    </Container>
  );
};

export default Dashboard;
