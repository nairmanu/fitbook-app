import React from "react";
import { View, Label, Form, Button, Icon, Input, Item, Text } from "native-base";

import { addEntryStyles } from "./AddEntry.style";
import { ResistanceModel } from '../../domainlogic/models/ResistanceModel';

interface AddEntryProps {
  isDarkMode: boolean;
  onClose: () => void;
  addResistance: (data: ResistanceModel) => void;
}

const AddEntry: React.FC<AddEntryProps> = ({ isDarkMode, onClose, addResistance }) => {
  const [styles, setStyles] = React.useState(addEntryStyles());
  const [type, setType] = React.useState<string>("");
  const [subType, setSubType] = React.useState<string>("");

  const onTypeChange = (value: string) => {
    setType(value);
  };

  const onSubTypeChange = (value: string) => {
    setSubType(value);
  };

  const onAddClick = () => {
    const data: ResistanceModel = {
      type,
      subType
    };
    addResistance(data);
    onClose();
  };

  React.useEffect(() => {
    setStyles(addEntryStyles());
  }, [isDarkMode, setStyles]);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button iconRight transparent style={styles.closeButton} onPress={onClose}>
          <Icon name="md-exit"></Icon>
        </Button>
        <Form>
          <Item floatingLabel>
            <Label style={styles.label}>Type</Label>
            <Input style={styles.input} value={type} onChangeText={onTypeChange} />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.label}>Subtype</Label>
            <Input style={styles.input} value={subType} onChangeText={onSubTypeChange} />
          </Item>
        </Form>
        <Button primary style={styles.addButton} onPress={onAddClick}>
          <Text>Add</Text>
        </Button>
      </View>
    </View>
  );
};

export default AddEntry;
