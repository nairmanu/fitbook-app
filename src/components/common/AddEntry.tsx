import React from "react";
import { View, Textarea, Form, Button, Icon, Input, Item, Text, Picker } from "native-base";

import { addEntryStyles } from "./AddEntry.style";
import Resistance, { ResistanceModel, ResistanceFormModel } from '../../domainlogic/models/ResistanceModel';
import { UnitsModel } from '../../domainlogic/models/UnitsModel';

interface AddEntryProps {
  isDarkMode: boolean;
  resistanceTypes: string[];
  onClose: () => void;
  addResistance: (data: ResistanceModel) => void;
}

const AddEntry: React.FC<AddEntryProps> = ({ isDarkMode, resistanceTypes, onClose, addResistance }) => {
  const [styles, setStyles] = React.useState(addEntryStyles());
  const [resistance, setResistance] = React.useState<ResistanceFormModel>({
    type: "",
    weight: "",
    reps: "",
    unit: UnitsModel.LBS.toLocaleLowerCase(),
    notes: "",
  });

  const onChange = (field: string, value: string | number) => {
    const r = Object.assign({}, { ...resistance });
    r[field] = value;
    setResistance(r);
  };

  const onAddClick = () => {
    const data: ResistanceModel = Resistance.fromFormModel(resistance);
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
          <Icon name="close" style={styles.closeButton}></Icon>
        </Button>
        <Form>
          <Item rounded picker style={styles.item}>
            <Picker

              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select type"
              textStyle={styles.input}
              style={styles.dropdownType}
              selectedValue={resistance.type}
              onValueChange={(value: string) => onChange("type", value)}
            >
              {resistanceTypes.map((type, index) =>
                <Picker.Item key={index} label={type} value={type} />
              )}
            </Picker>
          </Item>
          <Item rounded style={styles.item}>
            <Input placeholder="Weight" style={styles.input} value={resistance.weight} onChangeText={(value: string) => onChange("weight", value)} />
          </Item>
          <Item rounded style={styles.item}>
            <Input placeholder="Reps" style={styles.input} value={resistance.reps} onChangeText={(value: string) => onChange("reps", value)} />
          </Item>
          <Item rounded picker style={styles.item}>
            <Picker
              mode="dialog"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select unit"
              textStyle={styles.input}
              style={styles.dropdownUnits}
              selectedValue={resistance.unit}
              onValueChange={(value: string) => onChange("unit", value)}
            >
              <Picker.Item key={"kgs"} label="kgs" value={UnitsModel.KGS.toLocaleLowerCase()} />
              <Picker.Item key={"lbs"} label="lbs" value={UnitsModel.LBS.toLocaleLowerCase()} />
            </Picker>
          </Item>
          <Item regular style={styles.item}>
            <Textarea placeholder="Notes" rowSpan={3} bordered={false} underline={false} style={styles.input} value={resistance.notes} onChangeText={(value: string) => onChange("notes", value)} />
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
