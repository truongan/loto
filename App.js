import React, { useState } from 'react';

import {StyleSheet, Text, View, TouchableOpacity , Modal, Pressable} from 'react-native';


function generate_board(){
  var a2d = [...Array(9)].map((x) => [1,1,1,1,1,0,0,0,0]);
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  // console.log(arr);
  }
  
  function calc_sum(a2d){
    var sum_col = Array(9).fill(0);
    var sum_row = Array(9).fill(0);
    a2d.forEach((r, ri) => {
      r.forEach((c, ci)=>{
        sum_row[ri] += c;
        sum_col[ci] += c;
      })
    })
    return [sum_row, sum_col];
  }
  function check_sum(sum_row, sum_col){
    for (var i of sum_row) if (i != 5) return false;
    for (var i of sum_col) if (i < 4 || i > 6) return false;
    return true;
  }
  
  
  var tries = 0;
  
  var sum_row, sum_col;
  while(true){
    [sum_row, sum_col] = calc_sum(a2d);
    if (check_sum(sum_row, sum_col)) break;
    tries += 1;
    if (tries > 1000) break;
    a2d.forEach(e => shuffleArray(e));
    
  }
  
  //Go to each column and random number at "1" cells
  for(var i = 0; i < 9 ; i++){
    var num = [...Array(10)].map((e, idx) => i*10+idx+1);
    shuffleArray(num);
    // num = num.slice(0:5)
    var j = 0
    a2d.forEach(row => {
      if(row[i] == 1) row[i] = num[j];
      j += 1;
    });

  }
  console.log(a2d);
  return a2d;
}


const AdjustLabel = ({
  text, style, numberOfLines
}) => {
  const [currentFont, setCurrentFont] = useState(90);

  return (
    <Text
      numberOfLines={ numberOfLines }
      // numberOfLines={6}
    
      adjustsFontSizeToFit
      style={ [style, { fontSize: currentFont }] }
      onTextLayout={ (e) => {
        console.log(e.nativeEvent);
        // console.log("shit");
        console.log("shit");
        console.log("shit");
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      } }
    >
      { text }
      {/* { fontSize } */}
    </Text>
  );
};

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
    {/* <Text 
      adjustsFontSizeToFit
      allowFontScaling
      style = { {
        fontSize:50,
        color: highlight ? "#FF0000" : "#000"
      } }
    >
      {props.num == 0 ? "" : props.num}
    </Text> */}

    <AdjustLabel 
      text = {props.num == 0 ? "" : props.num}
      numberOfLines = {1}
      style = { {
        // fontSize:50,
        color: highlight ? "#FF0000" : "#000"
      } }
    >

    </AdjustLabel>
  </TouchableOpacity>

}


const Row = (props) => {
  var highlighted_count = 0;
  var increase_highlighted = () => {
    highlighted_count += 1;
    if (highlighted_count == 5){
      console.log("KINH KINH KINH");
    }
    console.log(highlighted_count);
  }

  var r = props.nums.map( (element, index) =>
      <Cell 
      key={props.nums + " " + index} 
      num = {element} 
      increase_highlighted={increase_highlighted} 
      ></Cell>
      );
  // console.log(r);
  // console.log(r);
  return   <View style={{flexDirection : "row", flexGrow: 1, width:"100%"}}>
      {r}
  </View>;
}

const YourApp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [board, setboard] = useState(generate_board());

  // var a2d = [...Array(9)].map(x => Array(9).fill(0));
  // var cells = []
  // a2d.forEach((e,i)=>{e.forEach((x,j)=>{cells.push([i,j])})});
  // console.log("start");
  // console.log(cells);


  // var a=[], b =[]
  // for (let i = 1; i < 91  ; i++) {
  //   a.push(i)
  // }
  // shuffleArray(a);
  // for(let i = 0; i < 45; i+=5){
  //   b.push(a.slice(i, i+5));
  // } 
  // console.log(b);
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
        board.map(e=><Row key = {e} nums={e} setModalVisible={setModalVisible}></Row>)
      }

      
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
