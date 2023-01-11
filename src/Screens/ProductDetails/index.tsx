import React, { useLayoutEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import theme from 'src/Utils/theme';
import Loader from 'src/Components/Loader';
import * as Api from 'src/Utils/Api';
import ApiConstants from 'src/Utils/apiConstants';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { verticalScale } from 'react-native-size-matters';

const ProductDetails = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const onProductDeatilsSucess =  (data:any) => {
    setProductDetails(data?.product);
    setLoading(false);
  };

  const getProductDeatils = () => {
    setLoading(true);
    Api.getApicall(
      ApiConstants.BASE_URL + ApiConstants.PRODUCT + "/" + route.params?.data,
      onProductDeatilsSucess,
    );
  };

  useLayoutEffect(() => {
    getProductDeatils();
  }, []);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View>
        {/* Close Icon */}
        <AntDesign
          onPress={() => navigation.navigate('ProductList')}
          name="close"
          size={verticalScale(20)}
          color={theme.BLACK}
          style={styles.icon}
        />
        <Image source={{ uri: productDetails?.avatar }} style={styles.image} />
      </View>
      {!loading && (
        <View style={styles.footerContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{productDetails?.name}</Text>
            <Text style={styles.title}>${productDetails?.price}</Text>
          </View>
          <Text style={styles.description}>
            {productDetails?.description}            
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
