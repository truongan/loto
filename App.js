import React, { useState } from 'react';

import {StyleSheet, Text, View, TouchableOpacity , Modal, Pressable} from 'react-native';

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
// console.log(arr);
}

const Cell = (props) =>{
  const [highlight,set_highlight] = useState(false);
  return  <TouchableOpacity
    onPress = {() => {
      if (highlight == false) props.increase_highlighted();
      set_highlight(true); console.log("SHIT SHIT PRESS");

    } } 
    style={
      {
      borderColor:"#000", borderWidth:1,

      padding:1,
      width: "11%",
      alignContent:'center',
      alignItems:'center',
      backgroundColor: props.num == 0? "#440" : "#fff"
      }
    }
  > 
    <Text 
      adjustsFontSizeToFit
      allowFontScaling
      style = { {
        fontSize:50,
        color: highlight ? "#FF0000" : "#000"
      } }
    >
      {props.num == 0 ? "" : props.num}
    </Text>
  </TouchableOpacity>

}


const Row = (props) => {
  // const [highlighted_count,set_highlighted_count] = useState(0);
  var highlighted_count = 0;
  var increase_highlighted = () => {
    // var a = highlighted_count + 1;
    // set_highlighted_count(a);
    highlighted_count += 1;
    if (highlighted_count == 5){
      console.log("KINH KINH KINH");
    }
    console.log(highlighted_count);
  }

  var arr = props.nums;
  arr.push(...[0,0,0,0]);
  shuffleArray(arr);
  shuffleArray(arr);
  var r = [];

  arr.forEach((element, index)  =>   {
    r.push(
      <Cell 
        key={props.nums + " " + index} 
        num = {element} 
        increase_highlighted={increase_highlighted} 
      ></Cell>
    );
  });
  // console.log(r);
  return   <View style={{flexDirection : "row", flexGrow: 1, width:"100%"}}>
      {r}
  </View>;
}

const YourApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  var a=[], b =[]
  for (let i = 1; i < 91  ; i++) {
    a.push(i)
  }
  shuffleArray(a);
  for(let i = 0; i < 45; i+=5){
    b.push(a.slice(i, i+5));
  } 
  console.log(b);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text>
        Try editing me! 🎉 
      </Text>
      
      {
        b.map(e=><Row nums={e} setModalVisible={setModalVisible}></Row>)
      }
      {/* <Row nums={[1,2,3,4,5]}></Row> 
      <Row nums={[1,2,3,4,5]}></Row> 
      <Row nums={[1,2,3,4,5]}></Row>  */} 
      
    </View>
  );



}

export default YourApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
