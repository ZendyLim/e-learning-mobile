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
class SL2Screen extends Component {
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
           <Text>0 ぜろ      zero
1 いち　    ichi
2 に        ni
3 さん      san
4 よん/し   yon/shi
5 ご        go
6 ろく      roku
7 なな/しち nana/shichi
8 はち      hachi
9 きゅう/く kyuu/ku
10　じゅう　juu
11　じゅういち		 juuichi
12　じゅうに		 juuni
13　じゅうさん		 juusan
14　じゅうよん/じゅうし  juuyon/juushi
15　じゅうご		 juugo
16　じゅうろく		 juuroku
17　じゅうなな/じゅうしち  juunana/juushichi
18　じゅうはち		 juuhachi
19　じゅうきゅう/じゅうく juukyuu/juuku
20　にじゅう		 nijuu
30  さんじゅう 		 sanjuu
40  よんじゅう 		 yonjuu
50  ごじゅう		 gojuu
60  ろくじゅう		 rokujuu
70  ななじゅう		 nanajuu
80  はちじゅう		 hachijuu
90  きゅうじゅう	 kyuujuu
100 ひゃく		 hyaku
200 にひゃく		 nihyaku
300 さんびゃく		 sanbyaku
400 よんひゃく		 yonhyaku
500 ごひゃく		 gohyaku
600 ろっぴゃく		roppyaku
700 ななひゃく		nanahyaku
800 はっぴゃく		happyaku
900 きゅうひゃく	kyuuhyaku

1000 せん		sen
2000 にせん		nisen
3000 さんぜん		sanzen
4000よんせん		yonsen
5000ごせん		gosen
6000ろくせん		rokusen
7000ななせん		nanasen
8000 はっせん		hassen
9000　きゅうせん	kyuusen
10,000 いちまん		ichiman		
100,000じゅうまん	juuman
1,000,000ひゃくまん 	hyakuman

Counter suffixes

           </Text>
        </ScrollView>
      );
  }
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default SL2Screen;
