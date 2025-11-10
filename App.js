import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
  FlatList,
  StatusBar,
  Image,
  Pressable,
  SectionList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  VirtualizedList,
} from 'react-native';

const DATA = [
  { id: '1', title: 'First Item' },
  { id: '2', title: 'Second Item' },
  { id: '3', title: 'Third Item' },
];

const SECTION_DATA = [
  { title: 'Main dishes', data: ['Pizza', 'Burger', 'Risotto'] },
  { title: 'Sides', data: ['French Fries', 'Onion Rings', 'Fried Shrimps'] },
  { title: 'Drinks', data: ['Water', 'Coke', 'Beer'] },
  { title: 'Desserts', data: ['Cheese Cake', 'Ice Cream'] },
];

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = () => 50;

const ListItem = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.listTitle}>{title}</Text>
  </View>
);

const DisplayImages = () => (
  <View style={styles.imageContainer}>
    <Image
      style={styles.tinyLogo}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
    <Image
      style={styles.logo}
      source={{ uri: 'https://reactnative.dev/img/header_logo.png' }}
    />
  </View>
);

const PressableButton = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = `${timesPressed}x onPress`;
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <View style={styles.outputContainer}>
      <Pressable
        onPress={() => setTimesPressed((current) => current + 1)}
        style={({ pressed }) => [
          { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>

      <View style={styles.logBox}>
        <Text>{textLog}</Text>
      </View>
    </View>
  );
};

const LoremText = () => (
  <ScrollView style={styles.loremScroll}>
    <Text style={styles.loremText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </ScrollView>
);

const DisplaySectionList = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.dynamicText}>SectionList Example:</Text>
    <SectionList
      sections={SECTION_DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.sectionItem}>
          <Text style={styles.listTitle}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  </View>
);

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';
  const onPressTitle = () => setTitleText("Bird's Nest [pressed]");

  return (
    <View style={styles.outputContainer}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={onPressTitle}>
          {titleText}{'\n\n'}
        </Text>
        <Text numberOfLines={5}>{bodyText}</Text>
      </Text>
    </View>
  );
};

const TextInputExample = () => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  return (
    <View style={styles.outputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type text..."
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Numeric input..."
        keyboardType="numeric"
      />
    </View>
  );
};

const TouchableHighlightExample = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.outputContainer}>
      <TouchableHighlight onPress={() => setCount(count + 1)}>
        <View style={styles.button}>
          <Text>Touch Here (Highlight)</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count || null}</Text>
      </View>
    </View>
  );
};

const TouchableWithoutFeedbackExample = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.outputContainer}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Count: {count}</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
        <View style={styles.button}>
          <Text>Touch Here (No Feedback)</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ViewBoxesWithColorAndText = () => (
  <View style={styles.viewBoxesContainer}>
    <View style={styles.blueBox} />
    <View style={styles.redBox} />
    <Text style={styles.viewBoxesText}>Hello World!</Text>
  </View>
);

const VirtualizedListExample = () => {
  const Item = ({ title }) => (
    <View style={styles.virtualItem}>
      <Text style={styles.listTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.dynamicText}>VirtualizedList Example:</Text>
      <VirtualizedList
        data={[]}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

export default function App() {
  const [outputs, setOutputs] = useState([
    <View key="loader" style={[styles.horizontal, styles.outputContainer]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </View>,
    <Text key="intro" style={styles.dynamicText}>
      Welcome! All outputs appear below:
    </Text>,
    <View key="button1" style={styles.outputContainer}>
      <Text style={styles.title}>Press this button:</Text>
      <Button title="Press me" onPress={() => Alert.alert('Button pressed')} />
    </View>,
    <PressableButton key="pressableButton" />,
    <LoremText key="loremText" />,
    <DisplaySectionList key="sectionList" />,
    <TextInANest key="textInANest" />,
    <TextInputExample key="textInputExample" />,
    <TouchableHighlightExample key="touchableHighlight" />,
    <TouchableWithoutFeedbackExample key="touchableWithoutFeedback" />,
    <ViewBoxesWithColorAndText key="viewBoxes" />,
    <VirtualizedListExample key="virtualizedList" />,
  ]);

  const [inputValue, setInputValue] = useState('');

  const addOutput = () => {
    if (!inputValue.trim()) return;
    const newKey = `output${outputs.length + 1}`;
    setOutputs([
      ...outputs,
      <Text key={newKey} style={styles.dynamicText}>
        {inputValue}
      </Text>,
    ]);
    setInputValue('');
  };

  return (
    <View style={styles.safeArea}>
      <FlatList
        data={outputs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <View style={{ width: '100%' }}>{item}</View>}
        contentContainerStyle={styles.scrollContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Add Output" onPress={addOutput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  outputContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  dynamicText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sectionContainer: {
    width: '100%',
    marginVertical: 10,
  },
  sectionItem: {
    backgroundColor: '#e0c2ff',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  listTitle: {
    fontSize: 24,
  },
  sectionHeader: {
    fontSize: 28,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  loremScroll: {
    backgroundColor: 'pink',
    maxHeight: 200,
    marginVertical: 10,
  },
  loremText: {
    fontSize: 18,
    padding: 12,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
  viewBoxesContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  blueBox: {
    height: 100,
    backgroundColor: 'blue',
    flex: 0.2,
  },
  redBox: {
    height: 100,
    backgroundColor: 'red',
    flex: 0.4,
  },
  viewBoxesText: {
    marginLeft: 10,
  },
  virtualItem: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
});
