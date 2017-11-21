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
  ActivityIndicator,
} from "react-native";
import {
  Icon,
  Text,
  List,
  ListItem,
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
import PopupDialog, {
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
// import Carousel, { ParallaxImage } from "react-native-snap-carousel"
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
      searchLoadMore: false,
      brandTitle: "",
      cantLoadMore: false,
      cate: "",
      storeImgurl: "",
      storeName: "",
      visible: true,
      productions: "",
      loadProvider: true,
      titleProvider: ""
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
      console.log("Auto scroll");
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

  componentWillReceiveProps(props) {
    // console.log("________________________________",props)
    // let category = this.state.category;
    let products = this.state.products;
    let subCategory = [];
    let cateProducts = this.state.cateProducts;
    this.setState({ loadData: false, loadSubcate: false, visible: false });
    if (props.fetchAllProvider.success) {
      if (this.state.loadProvider) {
        // let test = []
        // products = products.concat(props.searchProduct.data);
        // allProvider = props.fetchAllProvider.data;
        // allProvider = allProvider.concat(test);
        // this.setState({ category: allProvider });
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
        // console.log("props.fetchAllProvider");
        //   // subCategory = props.fetchCategory.data;
        //   // this.setState({ subCategory });
      }
    }
    if (props.searchProduct.success) {
      if (this.state.searchLoadMore) {
        // for (var i in products){
        //   for (var j in props.searchProduct.data){
        //     if(props.searchProduct.data[j].id===products[i].id){
        //     } else {
        //       products = products.push(props.searchProduct.data[j].id)
        //     }
        //   }
        // // }
        // console.log("products",products)
        products = products.concat(props.searchProduct.data);
        this.setState({ products, searchLoadMore: false });
        // console.log("products",this.state.products)
      } else {
        this.setState({ products: props.searchProduct.data });
      }
    }

    if (props.fetchCategory.success) {
      subCategory = props.fetchCategory.data;
      this.setState({ subCategory });
    }

    if (props.fetchCategoryProducts.success) {
      // console.log('length', props.fetchCategoryProducts.data.length)
      if (this.state.isLoadMore) {
        if (props.fetchCategoryProducts.data.length < 10) {
          cateProducts = cateProducts.concat(props.fetchCategoryProducts.data);
          this.setState({
            cateProducts,
            isLoadMore: false,
            cantLoadMore: true
          });
        } else {
          cateProducts = cateProducts.concat(props.fetchCategoryProducts.data);
          this.setState({
            cateProducts,
            isLoadMore: false,
            cantLoadMore: false
          });
        }
      } else {
        this.setState({ cateProducts: props.fetchCategoryProducts.data });
      }
    }
    // console.log("this.state.subCategory",this.state.subCategory)
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
    let render = <ActivityIndicator style={{ height: 137 }} />;
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
        render = <Text style={styles.alertText}>No results found</Text>;
      }
    }
    return (
      <View behavior="padding" style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.searchSectionWrap}>
            <TouchableOpacity
              transparent
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
              style={{ paddingTop: 15, color: "#A9A9A9" }}
              onChangeText={text =>
                text.length > 2
                  ? this.setState({ text: text })
                  : this.setState({ text: text, searchLoadMore: true })}
              placeholder="Search"
              placeholderTextColor="#A9A9A9"
              value={this.state.text}
              onSubmitEditing={() => this.onSearch()}
            />
            <TouchableOpacity
              onPress={() => this.onSearch()}
              activeOpacity={0.7}
              style={{ backgroundColor: "transparent" }}
            >
              <Icon name="ios-search" style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.headerSearchSection}>
          <TouchableOpacity
            transparent
            onPress={() =>
              this.setState({ productModalVisible: false, text: "" })}
          >
            <Icon style={styles.btnBack} active name="arrow-back" />
          </TouchableOpacity>
          <View style={styles.searchSectionModal}>
            <Input
              style={{ color: "#A9A9A9" }}
              onSubmitEditing={() => this.onSearch()}
              returnKeyType="done"
              onChangeText={text =>
                text.length > 2
                  ? this.setState({ text: text })
                  : this.setState({ text: text, searchLoadMore: true })}
              placeholder="Search"
              placeholderTextColor="#A9A9A9"
              value={this.state.text}
            />
          </View>
          <TouchableOpacity onPress={() => this.onSearch()} activeOpacity={0.7}>
            <Icon
              name="ios-search"
              style={[styles.iconSearch, { color: "white" }]}
            />
          </TouchableOpacity>
        </View> */}
        <View style={{ flex: 1, marginTop: 10 }}>
          {render}
        </View>
      </View>
    );
  }

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
    if (item.sale_price === 0) {
      return (
        <View style={styles.listCateView}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { marginRight: 5 }]}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }}>
            <View style={[styles.flexRow, { alignItems: "center" }]}>
              <Text style={styles.boldText}>Publisher: </Text>
              <Text style={styles.publisher}>
                {" "}{item.publisher}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
            >
              {item.title}
            </Text>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format}
              </Text>
            </View>
            <View
              style={[
                styles.flexRow,
                {
                  height: 30,
                  justifyContent: "flex-start",
                  alignItems: "center"
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
      return (
        <View style={styles.listCateView}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { marginRight: 5 }]}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }}>
            <View style={[styles.flexRow, { alignItems: "center" }]}>
              <Text style={styles.boldText}>Publisher: </Text>
              <Text style={styles.publisher}>
                {" "}{item.publisher}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
            >
              {item.title}
            </Text>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Sale price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format.slice(0, 1)}
                {item.sale_price}
              </Text>
            </View>
            <View
              style={[
                styles.flexRow,
                {
                  height: 30,
                  justifyContent: "flex-start",
                  alignItems: "center"
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
    } else if (provider === "AMZ") {
      image = amazonImage;
      name = "Amazon";
      icon = amazonIcon;
    } else if (provider === 8) {
      image = walmartImage;
      name = "Lowes";
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
      render = <ActivityIndicator style={{ height: 137 }} />;
      // <Text style={styles.alertText}>No category has been found</Text>;
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
      subTitleproduct: item.provider
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
      storeName: item.provider_name,
      store: item.id,
      storeImgurl: item.image_url,
      cate: cate,
      cateModalVisible: false,
      subCateModalVisible: true
      // brandTitle: item.category_name
    });
    let params = item.id;
    this.props.fetch(params);
  }

  onSearch() {
    Keyboard.dismiss;
    // console.log("onsearch");
    this.setState({ products: [], searchPage: 1 });
    let searchPage = 1;
    if (this.state.text == "" || this.checkSpaceAll(this.state.text)) {
      Alert.alert("", "Search field cannot be blank");
      this.setState({ text: "" });
    } else {
      if (this.state.text.length < 3) {
        Alert.alert("", "Search field must has more than 3 characters");
      } else {
        this.setState({
          productModalVisible: true,
          products: [],
          loadData: true
        });
        let params = {};
        params.keyword = this.state.text.trim();
        params.page = searchPage;
        this.props.search(params);
      }
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
      let searchPage = this.state.searchPage + 1;
      this.setState({ searchPage, searchLoadMore: true });
      let params = {};
      params.keyword = this.state.text.trim();
      params.page = searchPage;
      this.props.search(params);
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
              {this.renderListCateProducts(item)}
            </View>}
        />
      );
    } else {
      render = (
        // <Text style={styles.alertText}>No product has been found</Text>
        <ActivityIndicator style={{ height: 137 }} />
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

  //_____________________________render san pham (product)_____________________________
  renderListCateProducts(data) {
    let item = data.item;
    let image;
    if (item.medium_image) {
      image = item.medium_image;
    } else {
      image = "https://i.imgur.com/GN1yN2C.jpg";
    }
    // console.log("item",item);
    if (item.sale_price === 0) {
      return (
        <View style={styles.listCateView}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { height: 120, marginRight: 5 }]}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }}>
            <View style={[styles.flexRow, { alignItems: "center" }]}>
              <Text style={styles.boldText}>Publisher: </Text>
              <Text style={styles.publisher}>
                {" "}{item.publisher}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
            >
              {item.title}
            </Text>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text
                onPress={() => this.openLink(item.detail_page)}
                style={styles.detailLink}
              >
                More detail
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.listCateView}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { height: 120, marginRight: 5 }]}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }}>
            <View style={[styles.flexRow, { alignItems: "center" }]}>
              <Text style={styles.boldText}>Publisher: </Text>
              <Text style={styles.publisher}>
                {" "}{item.publisher}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
            >
              {item.title}
            </Text>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.boldText}>Sale price: </Text>
              <Text style={styles.price}>
                {" "}{item.price_format.slice(0, 1)}
                {item.sale_price}
              </Text>
            </View>
            <View style={styles.flexRow}>
              {/* <Text style={styles.boldText}>Detail and Buy: </Text> */}
              <Text
                onPress={() => this.openLink(item.detail_page)}
                style={styles.detailLink}
              >
                More detail
              </Text>
            </View>
          </View>
        </View>
      );
    }
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
    // console.log(event.nativeEvent.contentOffset.x, event.nativeEvent);
    var xOffset = event.nativeEvent.contentOffset.x;
    var chosingIndex = 0;
    chosingIndex = parseInt(xOffset / 200);
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
  render() {
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
              style={{ paddingTop: 15, color: "#A9A9A9" }}
              onChangeText={text => this.setState({ text: text })}
              placeholder="What do you want to buy..."
              placeholderTextColor="#A9A9A9"
              value={this.state.text}
              onSubmitEditing={() => this.onSearch()}
            />
            <TouchableOpacity
              onPress={() => this.onSearch()}
              activeOpacity={0.7}
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
              style={{
                marginTop: 10,
                color: "black",
                fontSize: 25,
                fontWeight: "bold"
              }}
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
                  <Text
                    style={{
                      color: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingLeft: 15
                      // marginLeft: 5
                    }}
                  >
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
        {/* <Text note> No product to show</Text> */}
        <ActivityIndicator style={{ height: 137 }} />
      </View>
    );
  }
  test() {}
  autoscrollProduct(item, index) {
    if (item.sale_price === 0) {
      return (
        <View key={index} style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={[styles.listCateView, { borderBottomWidth: 0 }]}>
            <Image
              source={{ uri: item.medium_image }}
              style={[styles.image, { marginLeft: 5, marginRight: 5 }]}
              resizeMode="contain"
            />
            <View style={{ flex: 2 }}>
              <View
                style={[
                  styles.flexRow,
                  { marginRight: 10, alignItems: "center", flex: 1 }
                ]}
              >
                <Text style={styles.boldText}>Publisher: </Text>
                <Text style={styles.publisher}>
                  {" "}{item.publisher}
                </Text>
              </View>
              <Text
                numberOfLines={2}
                style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
              >
                {item.title}
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.boldText}>Price: </Text>
                <Text style={styles.price}>
                  {" "}{item.price_format}
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  {
                    height: 30,
                    justifyContent: "flex-start",
                    alignItems: "center"
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
      return (
        <View key={index} style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={[styles.listCateView, { borderBottomWidth: 0 }]}>
            <Image
              source={{ uri: item.medium_image }}
              style={[styles.image, { marginLeft: 5, marginRight: 5 }]}
              resizeMode="contain"
            />
            <View style={{ flex: 2 }}>
              <View
                style={[
                  styles.flexRow,
                  { marginRight: 10, alignItems: "center", flex: 1 }
                ]}
              >
                <Text style={styles.boldText}>Publisher: </Text>
                <Text style={styles.publisher}>
                  {" "}{item.publisher}
                </Text>
              </View>
              <Text
                numberOfLines={2}
                style={{ marginTop: 5, fontWeight: "bold", color: "black" }}
              >
                {item.title}
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.boldText}>Price: </Text>
                <Text style={styles.price}>
                  {" "}{item.price_format}
                </Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.boldText}>Sale price: </Text>
                <Text style={styles.price}>
                  {" "}{item.price_format.slice(0, 1)}
                  {item.sale_price}
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  {
                    height: 30,
                    justifyContent: "flex-start",
                    alignItems: "center"
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
