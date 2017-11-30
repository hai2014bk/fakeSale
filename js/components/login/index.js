import React, { Component } from "react";
import {
  Keyboard,
  Dimensions,
  Alert,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator
} from "react-native";
import {
  Icon,
  Text,
  List,
  ListItem,
  Label,
  Header,
  Container,
  Content,
  Thumbnail,
  Input,
  Left,
  Right,
  Body,
  Button
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { searchProduct } from "../../actions/searchProduct.js";
import { fetchCategory } from "../../actions/fetchCategory.js";
import { fetchCategoryProducts } from "../../actions/fetchCategoryProducts.js";
import { fetchAllProvider } from "../../actions/fetchAllProvider.js";
import { NavigationActions } from "react-navigation";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import styles from "./styles";
import { Permissions, Notifications, ImagePicker, FileSystem } from "expo";
import Carousel from "react-native-banner-carousel";
import Spinner from "react-native-loading-spinner-overlay";
import * as mConstants from "../../utils/Constants";
import TouchAble from "react-native-touch-able";
import { style } from "expo/src/Font";
const BannerWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;
const bgr = require("../../../images/background.png");
const logo = require("../../../images/logoFakeSale.png");
const iconCategory = require("../../../images/iconCategory.png");

const amazonIcon = require("../../../images/amazon.png");
const amazonImage = require("../../../images/amazonimage.jpg");
const bestbuyIcon = require("../../../images/bestbuy.png");
const bestbuyImage = require("../../../images/bestbuyimage.jpg");
const searsIcon = require("../../../images/sears.png");
const walmartImage = require("../../../images/walmartimage.png");
const linenchestIcon = require("../../../images/linenchest.png");
const thebayIcon = require("../../../images/thebay.png");
const lowesIcon = require("../../../images/lowes.png");
const homedepotIcon = require("../../../images/homedepot.png");
const bedbathIcon = require("../../../images/bedbath.png");
const costcoIcon = require("../../../images/costco.png");
var dismissKeyboard = require("dismissKeyboard");
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
var timer = 0;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productModalVisible: false,
      products: [],
      listProvider: [],
      chosingProvider: "",
      text: "",
      autoScorll: true,
      providerIndex: 0,
      loadData: true,
      loadSubcate: true,
      category: [],
      subCategory: [],
      cateProducts: [],
      cateModalVisible: false,
      subCateModalVisible: false,
      cateProductModalVisible: false,
      title: "",
      subTitleproduct: "",
      page: 1,
      searchPage: 1,
      cateId: 0,
      isLoadMore: false,
      searchLoadMore: true,
      brandTitle: "",
      cantLoadMore: false,
      cate: "",
      storeImgurl: "",
      storeName: "",
      visible: true,
      productions: "",
      loadProvider: true,
      titleProvider: "",
      shouldLoadmore: true
    };
  }

  componentDidMount() {
    this.props.fetchProvider();
    // var timer = setInterval(() => {
    //   console.log('I do not leak!');
    // }, 5000);
  }
  // componentWillUnmount() {
  //   clearInterval(timer);
  // }

  autoRunProvider(listProvider) {
    timer = setInterval(() => {
      // console.log("Auto scroll");
      var providerIndex = this.state.providerIndex;
      if (providerIndex < this.state.category.length - 1) {
        providerIndex++;
        // console.log("asdasd", this.state.category[index]);
        this.setState({
          chosingProvider: listProvider[providerIndex],
          providerIndex: providerIndex
        });
        this.listProvider.scrollToIndex({
          animated: false,
          index: providerIndex
        });
      } else {
        providerIndex = 0;
        this.setState({
          chosingProvider: listProvider[providerIndex],
          providerIndex: providerIndex
        });
        this.listProvider.scrollToIndex({
          animated: false,
          index: providerIndex
        });
      }
    }, 15000);
  }
  uniqueArray(array){
    var seens = []
    console.log('asd12e12e',array)
    for (item in array){
      for (seenItem in seens){
        if (item.id == seenItem.id){
          array.splice(item,1)
        } else {
          seens.push(item)
        }
      }
    }
    return array
  }
  componentWillReceiveProps(props) {
    // console.log("props");
    // let category = this.state.category;
    let products = this.state.products;
    let subCategory = [];
    let cateProducts = this.state.cateProducts;
    this.setState({ loadData: false, loadSubcate: false, visible: false });
    if (props.fetchAllProvider.success) {
      if (this.state.loadProvider) {
        this.setState({
          category: props.fetchAllProvider.data,
          listProducts: props.fetchAllProvider.data,
          chosingProvider: props.fetchAllProvider.data[0],
          listProvider: props.fetchAllProvider.data,
          loadProvider: false
        });
        setTimeout(() => {
          this.autoRunProvider(props.fetchAllProvider.data);
        }, 2000);
      }
    }
    if (props.searchProduct.success) {
          if (props.searchProduct.data.length < 10) {
            console.log("aaaa", props.searchProduct.data.length);
            products = products.concat(props.searchProduct.data);
            console.log('poducqwcas',products)
            var test = this.uniqueArray(products)
            products = this.uniqueArray(products)            
            this.setState({
              products,
              shouldLoadmore: false,
              searchLoadMore: false
            });
          } else {
            products = products.concat(props.searchProduct.data);
            var test = this.uniqueArray(products)            
            products = this.uniqueArray(products)
            this.setState({
              products,
              shouldLoadmore: true,
              searchLoadMore: false
            });
          }
    }
    if (props.fetchCategory.success) {
      subCategory = props.fetchCategory.data;
      this.setState({ subCategory });
    }

    if (props.fetchCategoryProducts.success) {
      if (this.state.isLoadMore) {
        if (props.fetchCategoryProducts.data.length < 10) {
          console.log(33333);
          cateProducts = cateProducts.concat(props.fetchCategoryProducts.data);
          this.setState({
            cateProducts,
            isLoadMore: false,
            cantLoadMore: true
          });
        } else {
          console.log(22222);
          cateProducts = cateProducts.concat(props.fetchCategoryProducts.data);
          this.setState({
            cateProducts,
            isLoadMore: false,
            cantLoadMore: false
          });
        }
      } else {
        console.log(11111);
        cateProducts = cateProducts.concat(props.fetchCategoryProducts.data);
        this.setState({ cateProducts: cateProducts });
      }
      console.log(this.state.cateProducts.length);
    }
  }

  render() {
    // console.log(BannerWidth);
    console.log("sdsadas", this.state.products.length);
    chosingProvider = this.state.chosingProvider;
    return (
      <Container
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column",
          paddingTop: Platform === "ios" ? 20 : 5
        }}
      >
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.searchSectionWrap}>
            <Input
              {...this.props}
              ref={ref => {
                this.search = ref;
              }}
              style={{ paddingTop: 15, color: "#A9A9A9" }}
              onChangeText={text => {
                // console.log(text);
                this.setState({ text: text });
              }}
              placeholder="What do you want to buy..."
              placeholderTextColor="#A9A9A9"
              value={this.state.text}
              onSubmitEditing={() => this.onSearch()}
            />
            <TouchableOpacity
              onPress={() => this.onSearch()}
              activeOpacity={0.1}
              style={{ backgroundColor: "transparent" }}
            >
              <Icon name="ios-search" style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
        </View>
        <Content>
          <View style={{ marginTop: 0, paddingLeft: 20 }}>
            <Text
              onPress={() => dismissKeyboard()}
              style={styles.bigTextHeader}
            >
              Fake Sale
            </Text>
            <Text
              onPress={() => dismissKeyboard()}
              style={{ color: "#696969" }}
            >
              See if your deal is good or not?
            </Text>
          </View>
          <Grid>
            <Row size={1}>
              <View>
                <FlatList
                  ref={ref => {
                    this.listProvider = ref;
                  }}
                  data={this.state.category}
                  keyExtractor={item => item.id}
                  horizontal
                  bounces={false}
                  scrollEventThrottle={400}
                  onScroll={e => {
                    this.handleScroll(e);
                  }}
                  onMomentumScrollBegin={e => {}}
                  //   onMomentumScrollEnd={(event) => {
                  //     // scroll animation ended
                  //     console.log(event.nativeEvent.contentOffset.x);
                  //     console.log(event.nativeEvent.contentOffset.y);
                  //  }}
                  getItemLayout={(data, index) => ({
                    length: 200,
                    offset: 200 * index,
                    index
                  })}
                  renderItem={({ item, index }) =>
                    <View style={{ marginTop: 20 }}>
                      {this.renderListProvider(item, index)}
                    </View>}
                  // onScroll={()=>console.log(22112)}
                  // renderItem={( item, index) =>
                  //   <View style={{ marginTop: 20 }}>
                  //     {this.renderListProvider(item, index)}
                  //   </View>}
                />
              </View>
            </Row>
            <Row size={2}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text style={styles.provNameText}>
                    {chosingProvider.provider_name}
                  </Text>
                  <TouchableOpacity
                    style={{ marginRight: 5 }}
                    onPress={() => {
                      this.setState({
                        cateModalVisible: true,
                        title: "CATEGORY"
                      });
                    }}
                  >
                    <Text style={{ color: "black" }}>MORE</Text>
                  </TouchableOpacity>
                </View>
                {this.productions()}
              </View>
            </Row>
          </Grid>
        </Content>
        {/* render site*/}
        {this.renderCategoryModal()}
        {/* render category in a site*/}
        {this.renderSubCategoryModal()}
        {/* render product of category in a site*/}
        {this.renderCateProductModal()}
        {/* render product of search*/}
        {this.renderProductModal()}
        <Spinner visible={this.state.visible} />
      </Container>
    );
  }

  _keyExtractor = (item, index) => item.id;

  openLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  }
  // ___________________________ render product of search ___________________________
  renderProductModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.productModalVisible}
        onRequestClose={() => {}}
      >
        {this.renderSearchSection()}
      </Modal>
    );
  }
  _keyExtractorSearch = (item, index) => item.detail_page;
  renderSearchSection() {
    let render = null;
    if (this.state.products.length > 0) {
      render = (
        <FlatList
          data={this.state.products}
          keyExtractor={this._keyExtractor}
          scrollToEnd={this.scrollToEnd}
          onEndReached={distanceFromEnd => this.searchProductLoadMore()}
          onEndReachedThreshold={0.5}
          renderItem={item =>
            <View style={styles.ListProductsItem}>
              {this.renderListProducts(item)}
            </View>}
        />
      );
    } else {
      if (this.state.loadData) {
        render = <ActivityIndicator style={{ height: 137 }} />;
      } else {
        //123456789
        render = <Text style={styles.alertText}>No results found</Text>;
      }
    }
    return (
      <View style={{ flex: 1, flexDirection: "column", marginTop: 5 }}>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.searchSectionWrap}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ productModalVisible: false, text: "" });
              }}
            >
              <Icon
                style={[styles.btnBack, { color: "#cecece" }]}
                active
                name="arrow-back"
              />
            </TouchableOpacity>
            <Input
              {...this.props}
              ref={ref => {
                this.search = ref;
              }}
              style={{ paddingTop: 15, color: "#A9A9A9" }}
              onChangeText={text => {
                // console.log(text);
                // text.length > 2
                //   ? this.setState({ text: text })
                this.setState({ text: text, searchLoadMore: true });
              }}
              placeholder="Search"
              blurOnSubmit={false}
              autoFocus={false}
              autoCorrect={false}
              placeholderTextColor="#A9A9A9"
              value={this.state.text}
              onSubmitEditing={() => {
                this.onSearch();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.onSearch();
              }}
              activeOpacity={0.1}
            >
              <Icon name="ios-search" style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          {render}
        </View>
      </View>
    );
  }
  //___________________________ render list product _______________
  renderListProducts(data) {
    let item = data.item;
    // console.log("data", item);
    let image = "";
    let icon = "";
    let provider = item.category.provider;
    if (item.medium_image) {
      image = item.medium_image;
    } else {
      image = "https://i.imgur.com/GN1yN2C.jpg";
    }

    if (item.price_amount !== 0) {
      return (
        <View style={styles.listCateView}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { marginRight: 5 }]}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }}>
            {this.publisherView(item)}
            <Label
              numberOfLines={3}
              style={{ fontWeight: "bold", color: "black", fontSize: 15 }}
            >
              {item.title.trim()}
            </Label>
            {/* <View style={[styles.flexRow,{justifyContent:"flex-start", alignItems:"center"}]}>
            <Text
                  numberOfLines={2}
                  style={[
                    styles.boldText,
                    { width: 100 }
                  ]}
                >
                  Lowest Price before Sale:{" "}
                </Text>
              <Text style={styles.price}>
                {" "}{item.price_format}
              </Text>
            </View> */}
            {this.lowestPriceView(item)}
            {this.salePriceView(item)}
            <View
              style={[
                styles.flexRow,
                {
                  height: 30,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop:10                  
                }
              ]}
            >
              {/* <Text style={styles.boldText}>More detail: </Text> */}
              <Text
                numberOfLines={1}
                onPress={() => this.openLink(item.detail_page)}
                style={styles.detailLink}
              >
                More detail
              </Text>
              <Image
                source={this.checkprovider(item.category.provider, "icon")}
                style={{ height: 30, width: 30, marginLeft: 10 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  checkprovider(provider, value) {
    var image;
    var icon;
    var name;
    if (provider === 2) {
      image = bestbuyImage;
      name = "Best Buy";
      icon = bestbuyIcon;
    } else if (provider === 10) {
      image = amazonImage;
      name = "Amazon";
      icon = amazonIcon;
    } else if (provider === 8) {
      image = walmartImage;
      name = "Lowe's";
      icon = lowesIcon;
    } else if (provider === "SEARS") {
      image = bestbuyImage;
      name = "Sears";
      icon = lowesIcon;
    } else if (provider === 3) {
      image = amazonImage;
      name = "Linen Chest";
      icon = linenchestIcon;
    } else if (provider === 4) {
      image = walmartImage;
      name = "Hudson's Bay";
      icon = thebayIcon;
    } else if (provider === 9) {
      image = amazonImage;
      name = "The Home Depot";
      icon = homedepotIcon;
    } else if (provider === 7) {
      image = bestbuyImage;
      name = "Bed Bath & Beyond";
      icon = bedbathIcon;
    } else if (provider === "CC") {
      image = walmartImage;
      name = "Costco";
      icon = costcoIcon;
    }
    if (value === "image") {
      return image;
    } else if (value === "name") {
      return name;
    } else if (value === "icon") {
      return icon;
    }
  }

  //____________________ render category in a site ______________
  renderSubCategoryModal() {
    let render = null;
    if (this.state.subCategory.length > 0) {
      render = (
        <FlatList
          data={this.state.subCategory}
          keyExtractor={this._keyExtractor}
          renderItem={item =>
            <View style={styles.listItem}>
              {this.renderSubCategory(item)}
            </View>}
        />
      );
    } else {
      if (this.state.loadData) {
        render = <ActivityIndicator style={{ height: 137 }} />;
      } else {
        render = (
          <Text style={styles.alertText}>No category has been found</Text>
        );
      }
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.subCateModalVisible}
        onRequestClose={() => {}}
      >
        <Container>
          <Image
            source={{ uri: this.state.storeImgurl }}
            style={styles.headerImgSubCategory}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.1),",
                height: 200,
                width: BannerWidth
              }}
            >
              <TouchableOpacity
                style={styles.headerBackBtn}
                onPress={() =>
                  this.setState({
                    subCateModalVisible: false,
                    cateModalVisible: this.state.cate ? true : false,
                    title: "Category"
                  })}
              >
                <Text style={{ marginLeft: 10 }}>BACK</Text>
              </TouchableOpacity>
            </View>
          </Image>
          <View style={styles.headerBoldTextView}>
            <Text numberOfLines={1} style={styles.headerBoldText}>
              {this.state.storeName}
            </Text>
          </View>
          <View style={{ paddingBottom: Platform.OS === "ios" ? 300 : 275 }}>
            {render}
          </View>
        </Container>
      </Modal>
    );
  }

  renderSubCategory(data) {
    // console.log("renderSubCategorydata", data)
    let item = data.item;
    return (
      <TouchableOpacity
        onPress={() => this.subCategoryPick(item)}
        style={styles.cateItemWrap}
      >
        <Text style={styles.categoryText}>
          {item.category_name}
        </Text>
        <Icon name="ios-arrow-forward" style={styles.iconArrowForward} />
      </TouchableOpacity>
    );
  }

  subCategoryPick(item) {
    // console.log(12321, item);
    let page = 1;
    let params = {};
    params.id = item.id;
    params.page = page;
    this.setState({
      subCateModalVisible: false,
      cateProductModalVisible: true,
      titleproduct: item.category_name,
      cateId: item.id,
      cateProducts: [],
      cantLoadMore: false,
      page: 1,
      subTitleproduct: item.provider,
      loadData: true
    });
    this.props.fetchProducts(params);
  }

  renderCategoryModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.cateModalVisible}
        onRequestClose={() => {}}
      >
        <Container>
          <TouchableOpacity
            onPress={() => this.setState({ cateModalVisible: false })}
            style={{
              backgroundColor: "transparent",
              height: 30,
              marginTop: 25,
              width: 80
            }}
          >
            <Text style={[styles.normalText, { marginLeft: 10 }]}>BACK</Text>
          </TouchableOpacity>
          <View style={{ height: 50 }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "bold",
                color: "black"
              }}
            >
              CATEGORIES
            </Text>
          </View>
          <View style={{ paddingBottom: 105 }}>
            <FlatList
              data={this.state.category}
              keyExtractor={this._keyExtractor}
              renderItem={item =>
                <View style={styles.listItem}>
                  {this.renderListCategory(item)}
                </View>}
            />
          </View>
        </Container>
      </Modal>
    );
  }

  renderListCategory(data) {
    let item = data.item;
    return (
      <TouchableOpacity
        onPress={() => this.categoryPick(item, true)}
        style={{
          height: 140,
          width: BannerWidth,
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Image
          blurRadius={3}
          source={{ uri: item.image_url }}
          resizeMode="cover"
          style={{
            height: 140,
            width: BannerWidth
          }}
        >
          <View
            style={[
              styles.opacityView,
              { alignItems: "center", justifyContent: "center" }
            ]}
          >
            <Text style={{ fontSize: 35, fontWeight: "bold" }}>
              {item.provider_name}
            </Text>
            {/* <Icon name="ios-arrow-forward" style={styles.iconArrowForward} /> */}
          </View>
        </Image>
      </TouchableOpacity>
    );
  }

  categoryPick(item, cate) {
    // console.log("categoryPick", item);
    this.setState({
      loadData: true,
      storeName: item.provider_name,
      store: item.id,
      storeImgurl: item.image_url,
      cate: cate,
      cateModalVisible: false,
      subCateModalVisible: true,
      subCategory: []
      // brandTitle: item.category_name
    });
    let params = item.id;
    this.props.fetch(params);
  }

  onSearch() {
    Keyboard.dismiss();
    dismissKeyboard();
    // console.log("onsearch");
    this.setState({ products: [], searchPage: 1 });
    let searchPage = 1;
    if (this.state.text !== "" || !this.checkSpaceAll(this.state.text)) {
      // console.log("search1");
      if (this.state.text.length >= 3) {
        // console.log("search2");
        this.setState({
          productModalVisible: true,
          products: [],
          loadData: true
        });
        let params = {};
        params.keyword = this.state.text.trim();
        params.page = searchPage;
        this.props.search(params);
      } else {
        Alert.alert("", "Search field must has more than 3 characters", [
          {
            text: "OK",
            onPress: () => {
              // console.log("Press");
              this.search._root.focus();
            }
          }
        ]);
      }
    } else {
      Alert.alert("", "Search field cannot be blank", [
        {
          text: "OK",
          onPress: () => {
            // console.log("Press");
            this.search._root.setNativeProps({ text: "" });
            this.search._root.focus();
          }
        }
      ]);
      this.setState({ text: "" });
    }
  }

  cateProductLoadMore() {
    if (!this.state.cantLoadMore) {
      let page = this.state.page + 1;
      this.setState({ page, isLoadMore: true });
      let params = {};
      params.id = this.state.cateId;
      params.page = page;
      this.props.fetchProducts(params);
    } else {
    }
  }

  searchProductLoadMore() {
    if (!this.state.searchLoadMore) {
      if (this.state.shouldLoadmore) {
        let searchPage = this.state.searchPage + 1;
        this.setState({ searchPage, searchLoadMore: true });
        let params = {};
        params.keyword = this.state.text.trim();
        params.page = searchPage;
        this.props.search(params);
      }
    } else {
    }
  }
  /*__________________render product of category in a site________________________*/
  renderCateProductModal() {
    let render = null;
    if (this.state.cateProducts.length > 0) {
      render = (
        <FlatList
          data={this.state.cateProducts}
          keyExtractor={this._keyExtractor}
          scrollToEnd={this.scrollToEnd}
          onEndReached={distanceFromEnd => this.cateProductLoadMore()}
          onEndReachedThreshold={1}
          renderItem={item =>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              {this.renderListProducts(item)}
            </View>}
        />
      );
    } else {
      if (this.state.loadData) {
        render = <ActivityIndicator style={{ height: 137 }} />;
      } else
        render = (
          <Text style={styles.alertText}>No product has been found</Text>
        );
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.cateProductModalVisible}
        onRequestClose={() => {}}
      >
        <Container>
          <View style={{ height: 180, width: BannerWidth }}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    cateProductModalVisible: false,
                    title: "",
                    titleproduct: "",
                    subtitleproduct: "",
                    cateProducts: [],
                    subCateModalVisible: true
                  })}
                style={[styles.headerBackBtn, { height: 30 }]}
              >
                <Text style={[styles.normalText, { marginLeft: 10 }]}>
                  BACK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    cateProductModalVisible: false
                  })}
                style={styles.searchIconBtn}
              >
                <Icon name="ios-search" style={styles.searchIconProduct} />
              </TouchableOpacity>
            </View>
            <View style={{ height: 110, justifyContent: "space-around" }}>
              <Text
                numberOfLines={2}
                style={{
                  marginLeft: 10,
                  fontSize: 30,
                  fontWeight: "normal",
                  color: "black"
                }}
              >
                {this.state.titleproduct}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black"
                }}
              >
                {this.checkprovider(this.state.subTitleproduct, "name")}
              </Text>
            </View>
          </View>
          <View style={{ paddingBottom: 180 }}>
            {render}
          </View>
        </Container>
      </Modal>
    );
  }
  //______________ render list providers _________________
  renderListProvider(item, index) {
    // console.log("=============",index,item)
    // this.setState({production:item.productions})
    // console.log("=============",this.state.production)
    return (
      <Button
        key={index}
        rounded
        style={styles.providerBtn}
        onPress={() => this.categoryPick(item, false)}
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.providerImg}
          // resizeMode="contain"
        >
          <View style={styles.opacityView}>
            <View style={styles.providerName}>
              <Icon name="ios-pin-outline" />
              <Text
                numberOfLines={2}
                style={{ fontWeight: "bold", marginLeft: 3, marginRight: 10 }}
              >
                {item.provider_name}
              </Text>
            </View>
          </View>
          {/* <Text style={{ marginLeft: 3 }}>
            {item.item.params}
          </Text> */}
        </Image>
      </Button>
    );
  }

  handleScroll(event) {
    var load = true;
    // console.log(event.nativeEvent.contentOffset.x, event.nativeEvent);
    var xOffset = event.nativeEvent.contentOffset.x;
    var chosingIndex = 0;
    chosingIndex = parseInt(xOffset / 200);
    // console.log("chosingIndex",xOffset,chosingIndex)
    if (chosingIndex == this.state.providerIndex) {
      // console.log("2sadsa");
    } else {
      clearInterval(timer);
      chosingProvider = this.state.listProvider[chosingIndex];
      this.listProvider.scrollToIndex({ animated: true, index: chosingIndex });
      this.setState({
        providerIndex: chosingIndex,
        chosingProvider: chosingProvider
      });
      this.autoRunProvider(this.state.listProvider);
    }
  }
  onScrollBegin() {
    clearInterval(timer);
  }
  productions() {
    let production = [];
    // var sliders = [];
    chosingProvider = this.state.chosingProvider;
    if (!chosingProvider.productions) {
      return null;
    }
    production = chosingProvider.productions;
    productsView = [];
    for (i in production) {
      productsView.push(this.autoscrollProduct(production[i], i));
    }
    if (production.length > 0) {
      return (
        <Carousel
          autoplay
          loop
          showsPageIndicator={false}
          autoplayTimeout={3000}
          index={0}
          pageSize={BannerWidth}
          activePageIndicatorStyle={{ backgroundColor: primary }}
        >
          {/* {production.map((item, index) => 
            this.autoscrollProduct(item, index))} */}
          {productsView}
        </Carousel>
      );
    }
    return (
      <View style={{ flex: 1, height: 137 }} style={styles.slide1}>
        <Text note> No product to show</Text>
        {/* <ActivityIndicator style={{ height: 137 }} /> */}
      </View>
    );
  }

  checkpublisher(name) {
    // console.log(name)
    if (
      name === "Best Buy" ||
      name === "Linen Chest" ||
      name === "The bay" ||
      name === "Bed Bath and Beyond" ||
      name === "Lowe's" ||
      name === "Home Depot" ||
      name === "Amazon"
    ) {
      return true;
    } else {
      return false;
    }
  }
  publisherView(item) {
    // console.log(this.checkpublisher(item.publisher))
    if (!this.checkpublisher(item.publisher)) {
      return (
        <View
          style={[styles.flexRow, { marginRight: 2, alignItems: "center" }]}
        >
          <Text style={styles.publisherText}>Publisher: </Text>
          <Text style={styles.publisher}>
            {item.publisher.trim()}
          </Text>
        </View>
      );
    }
  }

  lowestPriceView(item) {
    // console.log(item.price_amount)
    var price = "$" + this.priceHandle(item.price_amount);
    if (item.category.provider == 10) {
      price = item.price_format;
    }
    if (item.price_amount !== 0) {
      return (
        <View
          style={[
            styles.flexRow,
            { justifyContent: "flex-start", alignItems: "center" }
          ]}
        >
          <Text numberOfLines={2} style={[styles.priceText]}>
            Lowest Regular Price:{" "}
          </Text>
          <Text style={styles.price}>
            {price}
          </Text>
        </View>
      );
    }
  }

  salePriceView(item) {
    // console.log(item.sale_price)
    if (item.sale_price !== 0) {
      return (
        <View style={styles.flexRow}>
          <Text style={styles.boldText}>Sale Price: </Text>
          <Text style={styles.price}>
            ${this.priceHandle(item.sale_price)}
          </Text>
        </View>
      );
    }
  }
  priceHandle(price) {
    var count = 0;
    price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return price;
  }
  autoscrollProduct(item, index) {
    // console.log("123123141555555",item)
    // if (item.sale_price === 0) {
    if (item.price_amount !== 0) {
      return (
        <View key={index} style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <View style={[styles.listCateView, { borderBottomWidth: 0 }]}>
            <Image
              source={{ uri: item.medium_image }}
              style={[styles.image, { marginLeft: 5, marginRight: 5 }]}
              resizeMode="contain"
            />
            <View style={{ flex: 2 }}>
              {this.publisherView(item)}
              {/* <View
                style={[
                  styles.flexRow,
                  { marginRight: 10, alignItems: "center", flex: 1 }
                ]}
              >
                <Text style={styles.boldText}>Publisher: </Text>
                <Text style={styles.publisher}>
                  {" "}{item.publisher}
                </Text>
              </View> */}
              <Text
                numberOfLines={2}
                style={{ fontWeight: "bold", color: "black" }}
              >
                {item.title.trim()}
              </Text>
              {/* <View style={[styles.flexRow,{justifyContent:"flex-start", alignItems:"center"}]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.boldText,
                    { width: 100 }
                  ]}
                >
                  Lowest Price before Sale:{" "}
                </Text>
                <Text style={styles.price}>
                  {" "}{item.price_format}
                </Text>
              </View> */}
              {this.lowestPriceView(item)}
              {this.salePriceView(item)}
              <View
                style={[
                  styles.flexRow,
                  {
                    height: 30,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop:10
                  }
                ]}
              >
                <Text
                  numberOfLines={1}
                  onPress={() => this.openLink(item.detail_page)}
                  style={styles.detailLink}
                >
                  More detail
                </Text>
                <Image
                  source={this.checkprovider(item.params, "icon")}
                  style={{ height: 30, width: 30, marginLeft: 10 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
  checkSpaceAll(text) {
    if (!text.replace(/\s/g, "").length) {
      return true;
    }
    return false;
  }
}

function bindActions(dispatch) {
  return {
    search: params => dispatch(searchProduct(params)),
    fetch: params => dispatch(fetchCategory(params)),
    fetchProducts: params => dispatch(fetchCategoryProducts(params)),
    fetchProvider: () => dispatch(fetchAllProvider())
  };
}
const mapStateToProps = state => ({
  searchProduct: state.searchProduct,
  fetchCategory: state.fetchCategory,
  fetchCategoryProducts: state.fetchCategoryProducts,
  fetchAllProvider: state.fetchAllProvider
});

export default connect(mapStateToProps, bindActions)(Login);
