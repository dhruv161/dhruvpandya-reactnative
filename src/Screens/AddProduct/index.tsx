import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Keyboard, ScrollView } from "react-native";
import theme from "src/Utils/theme";
import styles from "./style";
import Button from "src/Components/Button";
import * as Api from "src/Utils/Api";
import ApiConstants from "src/Utils/apiConstants";
import Loader from "src/Components/Loader";
import Snackbar from 'react-native-snackbar';

const AddProduct = ({ navigation }) => {
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categories, setCategories] = useState({ name: 'All' });

  const onCategoriesListSucess = (data: any) => {
    setCategoriesList(data?.categories)
    setLoading(false);
  };

  const getCategoriesList = () => {
    setLoading(true);
    Api.getApicall(
      ApiConstants.BASE_URL +
      ApiConstants.CATEGORIES,
      onCategoriesListSucess,
    );
  };

  const onAddProductSuccess = (data: any) => {
    setLoading(false)
    if(data.statusCode =='200'){
      navigation.navigate('ProductList')
    }else{
      Snackbar.show({
        text: data.message,
        duration: Snackbar.LENGTH_SHORT,
        textColor: theme.WHITE,
        backgroundColor: theme.RED,
      })
    }
  };

  const onAddProductError =  (data: any) => {
    setLoading(false)
    Snackbar.show({
      text: 'Something went wrong',
      duration: Snackbar.LENGTH_SHORT,
      textColor: theme.WHITE,
      backgroundColor: theme.RED,
    })
  };

  const onAddProduct = () => {
    setLoading(true)
    const params = {
      "Name": productTitle,
      "Category": categories,
      "Price": price,
      "Description": discription,
      "Avatar": imageUrl,
      "DeveloperEmail": 'dhruvpandya16199@gmail.com'
    };
    {
      productTitle?.length > 0 && price?.length > 0 && imageUrl?.length > 0 && discription?.length > 0 ? (
      //  true ? (
        Api.postApicall(
          ApiConstants.BASE_URL + ApiConstants.PRODUCT,
          params,
          onAddProductSuccess,
          onAddProductError
        )
      ) :
        Snackbar.show({
          text: 'Textinput can not blank',
          duration: Snackbar.LENGTH_SHORT,
          textColor: theme.WHITE,
          backgroundColor: theme.RED,
        })
      setLoading(false)
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const categoriesView = () => {
    return categoriesList?.map((data, index) => {
      return (
        <Pressable key={index.toString()} onPress={() => { setCategories(data?.name) }} style={{ flexDirection: 'row', padding: 10, borderWidth: 1, borderRadius: 5, marginRight: 10, borderColor: 'black', backgroundColor: data?.name == categories ? 'white' : 'black' }}>
          <Text style={[styles.title, { color: data?.name == categories ? 'black' : 'white' }]}>{data?.name}</Text>
        </Pressable>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <Text style={styles.usernameTitle}>Product Title</Text>
        <TextInput
          selectionColor={theme.GRAY}
          placeholder="Product Title"
          onChangeText={setProductTitle}
          value={productTitle}
          placeholderTextColor={theme.GRAY}
          style={styles.textInputStyle}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.usernameTitle}>Price</Text>
        {/* Input field */}
        <TextInput
          selectionColor={theme.GRAY}
          placeholder="Price"
          onChangeText={setPrice}
          value={price}
          placeholderTextColor={theme.GRAY}
          style={styles.textInputStyle}
          blurOnSubmit={false}
          keyboardType='numeric'
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.usernameTitle}>Discription</Text>
        {/* Input field */}
        <TextInput
          selectionColor={theme.GRAY}
          placeholder="Discription"
          onChangeText={setDiscription}
          value={discription}
          placeholderTextColor={theme.GRAY}
          multiline={true}
          style={[styles.textInputStyle, { height: 120, justifyContent: 'flex-start', alignItems:'flex-start' }]}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.usernameTitle}>Image</Text>
        {/* Input field */}
        <TextInput
          selectionColor={theme.GRAY}
          placeholder="Enter Image url"
          onChangeText={setImageUrl}
          value={imageUrl}
          placeholderTextColor={theme.GRAY}
          style={styles.textInputStyle}
          blurOnSubmit={false}
          onSubmitEditing={Keyboard.dismiss}
        />
      </Pressable>
      <Text style={styles.usernameTitle}>Categories</Text>
      <ScrollView contentContainerStyle={styles.itemView} horizontal={true} showsHorizontalScrollIndicator={false}>
        {categoriesView()}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button title={"Add Product"} onPress={() => onAddProduct()} />
      </View>
    </View>
  );
};

export default AddProduct;
