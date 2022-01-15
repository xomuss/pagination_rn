import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => getData(), []);

  const getData = () => {
    console.log('get data');
    setLoading(true);

    // Your API key is: 69a6a8427b1c4a16b36457c02d33290d
    //Service to get the data from the server to render
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&pageSize=10&page=${offset}&apiKey=69a6a8427b1c4a16b36457c02d33290d`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...responseJson.articles]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderFooter = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const itemView = ({item}) => {
    return <Text style={styles.itemStyles}>{item.title}</Text>;
  };

  const itemSeparatorView = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={itemView}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={itemSeparatorView}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyles: {
    paddingVertical: 10,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
