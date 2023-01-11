import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Pressable,
  ScrollView
} from 'react-native';
import Loader from 'src/Components/Loader';
import * as Api from 'src/Utils/Api';
import ApiConstants from 'src/Utils/apiConstants';
import styles from './style';
import theme from 'src/Utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [categories, setCategories] = useState({name: 'All'});

  const onProductListSucess = (data: any) => {
    if(categories.name === 'All' || categories === 'All'){
      setProductList(data?.products);
    }
    else{
      const largeGroup = data?.products?.filter((activity: any) => activity.category === categories)
      setProductList(largeGroup);
    }
    setLoading(false);
  };

  const getProductList = () => {
    setLoading(true);
    Api.getApicall(
      ApiConstants.BASE_URL +
        ApiConstants.PRODUCT,
      onProductListSucess,
    );
  };

  const onCategoriesListSucess =  (data: any) => {
    setCategoriesList([categories, ...data?.categories])
    setLoading(false);
  };

  const getCategoriesList = () => {
    setCategories('All')
    setLoading(true);
    Api.getApicall(
      ApiConstants.BASE_URL +
        ApiConstants.CATEGORIES,
        onCategoriesListSucess,
    );
  };

  useEffect(() => {
    getProductList();
  }, [refresh]);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const renderItem = ({item}) => {
    return (
        <Pressable onPress={() => navigation.navigate('ProductDetails', {data: item._id})} style={styles.mainCardView}>
          <Image source={{uri: item.avatar}} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.title}>${item?.price}</Text>
          </View>
        </Pressable>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyItemContainer}>
        <Text style={styles.noData}>No DATA found</Text>
      </View>
    );
  };

  const categoriesView = () => {
    return categoriesList?.map((data, index) => {
      return (
        <Pressable key={index.toString()}onPress={()=> { setCategories(data?.name), setRefresh(!refresh) }} style={{flexDirection: 'row', padding: 10, borderWidth: 1, borderRadius: 5, marginRight: 10, borderColor: 'black', backgroundColor: data?.name == categories ? 'white': 'black'}}>
          <Text style={[styles.title, { color: data?.name == categories ? 'black': 'white' }]}>{data?.name}</Text>
        </Pressable>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={styles.itemView} horizontal={true} showsHorizontalScrollIndicator={false}>
      {categoriesView()}
      </ScrollView>
      <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={productList}
          extraData={productList}
          renderItem={renderItem}
          listEmptyComponent={listEmptyComponent()}
          keyExtractor={(item, index) => index.toString()}
        />
        <MaterialIcons
          onPress={() => navigation.navigate('AddProduct')}
          name="add-circle-outline"
          size={40}
          color={theme.BLACK}
          style={styles.icon}
        />
    </View>
  );
};

export default ProductList;
