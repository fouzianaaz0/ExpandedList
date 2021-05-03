import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {data: [], isLoading: true};
  }

  componentDidMount() {
    return fetch('https://jsonkeeper.com/b/IT0J')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({isLoading: false, data: responseJson.Result});
        let arr = this.state.data;
        arr = arr.map(el => {
          el.isSelected = false;
          if (el.itemName === 'Chair')
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/2891/2891530.png';
          else if (el.itemName === 'Table')
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/632/632415.png';
          else if (el.itemName === 'Spoon')
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/1046/1046857.png';
          else if (el.itemName === 'Bike')
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/3198/3198344.png';
          else if (el.itemName === 'Mobile')
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/15/15874.png';
          else
            el.itemImage =
              'https://image.flaticon.com/icons/png/128/89/89102.png';
          return el;
        });
        this.setState({data: arr});
        console.log(this.state.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  update = index => {
    const arr = [...this.state.data];
    tempar = arr.map((item, i) => {
      if (i === index) {
        item.expand = !item.expand;
      } else {
        item.expand = false;
      }

      return item;
    });

    this.setState({data: tempar});
  };

  renderItem = ({item, index}) => {
    console.log(item.expand);
    let itemarr = [];
    const row = item.subItem;
    itemarr = row.map(rowItem => {
      return (
        <View style={styles.subCategory}>
          <Text style = {styles.subText}>{rowItem}</Text>
        </View>
      );
    });

    let i = item.expand ? require('./src/img/upload.png') : require('./src/img/arrow-down.png') 

    return (
      <View>
        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => {
            this.update(index);
          }}>
          <View style={styles.RowStyling}>
            <Image style={styles.ListIcon} source={{uri: item.itemImage}} />
            <Text style={styles.List}>{item.itemName}</Text>
            <Image
              style={styles.DownArrow}
              source={i}
            />
          </View>
        </TouchableOpacity>
        {item.expand ? itemarr : null}
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          <Image
            style={styles.backButton}
            source={require('./src/img/left-arrow.png')}
          />
          <Text style={styles.HeaderText}>Seniority</Text>
        </View>
        <ScrollView>
          <FlatList
            style={styles.FlatList}
            data={this.state.data}
            collapsable={this.state.collapsable}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  backButton: {
    height: 30,
    width: 30,
  },
  Header: {
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 10,
  },
  HeaderText: {
    fontSize: 25,
    marginLeft: 20,
    fontWeight: '700',
    color: 'green',
  },
  subCategory: {
    margin: 10,
  
  },
  container: {
    flex: 1,
  },
  DownArrow: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 10,
    marginTop: 10,
  },
  List: {
    margin: 10,
    fontSize: 20,
  },
  ListIcon: {
    height: 30,
    width: 30,
    marginTop: 5,
  },
  RowStyling: {
    flexDirection: 'row',
  },
  ButtonStyle: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  subText : {
    fontSize : 20
  },
  FlatList : {
    borderTopWidth : 1 ,
    borderColor : '#bebebe'
  }
});
