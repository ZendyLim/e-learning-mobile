import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity, 
} from 'react-native';
import { Icon } from 'react-native-elements';
import  { strings }   from '../../config/localization';
import { LearnListData } from '../../config/studyList';
import style from 'react-native-datepicker/style';
import ImageData from '../../config/image_list';
class HL2Screen extends Component {
  constructor() {
    super();
    this._onSetLanguageTo('en');
  }
  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  } 
  static navigationOptions = {
    title: 'Learn',
  };

  render() {
      return (
        <ScrollView style = { study.StudyContainer }>
            <Text style = {study.HL2Font }>
            日本語には3種類の文字があります。{"\n"} 
            ひらがな、カタカナ、漢字です。{"\n"} 
            </Text>

            <Text  style={study.HL2Font}>
            {"\n"} 
            歴史 {"\n"}
            4世紀ごろ、中国から漢字が伝わり、漢字をもとにひらがな、カタカナが作られました。 {"\n"}
            </Text>
            <Image
              style={study.HL2img}
                source={ require('../../assets/img/HL2.png') }
            />
            <Text  style={study.HL2Font}>
            {"\n"} 
            ひらがな{"\n"}
            1．基本　46音から成り立ちます。一つの音は母音(あ・い・う・え・お)、または母音＋子音(例　k+a=か)、んです。
            </Text>
            <View style={study.tableContainer}>
              <View style={[styles.row]}>
                <View style={ styles.col2Tbl }>
                  <Text>母音 | 子音</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>o</Text>
                </View>
    
              </View>
              <View style={styles.row}>
                <View style={ styles.col2Tbl }>
                  <Text></Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>あ {"\n"} a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>い {"\n"} i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>う {"\n"} u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>え {"\n"} e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>お {"\n"} o</Text>
                </View>
              </View>
            </View>
            <Text>
            {"\n"}
            ※ローマ字は発音に近い音で表記しています。{"\n"}{"\n"}
            2．ひらがな＋「”」「゜」{"\n"}
            23音あります。(じ・ぢ、ず・づ、は同じ音){"\n"}
            </Text>
            <View style={study.tableContainer}>
              <View style={[styles.row]}>
                <View style={ styles.col2Tbl }>
                  <Text>母音 | 子音</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>o</Text>
                </View>
    
              </View>
              <View style={styles.row}>
                <View style={ styles.col2Tbl }>
                  <Text></Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>あ {"\n"} a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>い {"\n"} i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>う {"\n"} u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>え {"\n"} e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>お {"\n"} o</Text>
                </View>
              </View>
            </View>
            <Text>{"\n"}
            2．ひらがな＋「“ゃ“”ゅ“”ょ“」{"\n"}
            33音あります。{"\n"}
            </Text>
            <View style={study.tableContainer}>
              <View style={[styles.row]}>
                <View style={ styles.col2Tbl }>
                  <Text>母音 | 子音</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>o</Text>
                </View>
    
              </View>
              <View style={styles.row}>
                <View style={ styles.col2Tbl }>
                  <Text></Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>あ {"\n"} a</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>い {"\n"} i</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>う {"\n"} u</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>え {"\n"} e</Text>
                </View>
                <View style={ styles.col2Tbl }>
                  <Text>お {"\n"} o</Text>
                </View>
              </View>
              <Text>
              {"\n"}
              ４．子音が二つ続くとき {"\n"}
tt/ss/pp「っ」になる。　Ex.　まった　matta　ざっし zasshi　いっぱい ippai
nn 「ん」になる。　　　Ex.　さんねん sannen{"\n"}{"\n"}
５．母音が二つ続くとき {"\n"}
1)その音を2拍発音します{"\n"}
aa 　おばあさん　obaasan (grandmother){"\n"}
ii　　おじいさん ojiisan (grandfather){"\n"}
uu　　つうち　tsuuchi{"\n"}
*拍の長さで意味が変わることがあります。{"\n"}
　 例：おばさん obasan(aunt)　{"\n"}
おじさん(uncle){"\n"}
2)ee{"\n"}
oo{"\n"}
{"\n"}
3)カタカナ{"\n"}
  aa/ii/uu/ee/oo 「－」になります。{"\n"}
　ケーキ keeki   (cake){"\n"}
  デパート　depaat  (department store){"\n"}{"\n"}
６．助詞の「へ」「は」{"\n"}
　発音が「へ」は「e」、「は」は「wa」になります。{"\n"}
　わたしは　かいしゃへ　いきます{"\n"}
　Watashi wa kaisha e ikimasu{"\n"}
 I go to my office{"\n"}
              </Text>
            </View>

  
        </ScrollView>
      );
  }
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default HL2Screen;
