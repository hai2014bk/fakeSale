const React = require("react-native");

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variable").brandPrimary;

export default {
  bodyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchWrap: {
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 60,
    width: "90%"
  },
  iconSearch: {
    fontSize: 22,
    color: "#cecece",
    marginTop: Platform.OS === "ios" ? 12 : 15,
    fontWeight: "500",
    marginHorizontal: 18
  },
  itemWrap: {
    width: "100%",
    paddingLeft: 15,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    marginTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  searchSectionWrap: {
    flexDirection: "row",
    height: 55,
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#cecece",
    justifyContent: "center",
    alignItems: "center"
  },
  searchSectionModal: {
    flex: 1,
    flexDirection: "row",
    height: Platform.OS === "ios" ? 45 : 55,
    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: primary,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: Platform.OS === "ios" ? 5 : 0
  },
  image: {
    flex: 1,
    marginTop: 5
  },
  btnBack: {
    fontSize: 35,
    fontWeight: "500",
    marginHorizontal: 18,
    marginTop: Platform.OS === "ios" ? 7 : 10
  },
  normalText: {
    color: "#696969",
    fontSize: 14
  },
  boldText: {
    color: "#696969",
    fontWeight: "500",
    fontSize: deviceWidth * 0.04,
    width: 100
  },
  publisherText: {
    color: "#696969",
    fontWeight: "500",
    fontSize: deviceWidth * 0.04
  },
  detailLink: {
    color: "#4C4CFF",
    textDecorationLine: "underline",
    fontSize: 15
    // marginLeft: 5
  },
  alertText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#696969",
    textAlign: "center",
    marginTop: 50
  },
  menuIcon: {
    fontSize: 40,
    color: "white",
    margin: 10
  },
  price: {
    color: "#DC143C",
    fontWeight: "500",
    fontSize: deviceWidth * 0.04
  },
  publisher: {
    color: primary,
    fontWeight: "500",
    fontSize: 14,
    // width:120,
    marginRight: 3
  },
  flexRow: {
    flexDirection: "row"
  },
  background: {
    width: "100%",
    height: "100%"
  },
  menuIconWrap: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 30,
    marginRight: 30
  },
  logo: {
    marginTop: -200,
    marginBottom: 30
  },
  cateItemWrap: {
    borderBottomWidth: 1,
    borderColor: "#cecece",
    paddingVertical: 20,
    paddingLeft: 20,
    flexDirection: "row"
  },
  categoryText: {
    color: "#696969",
    fontSize: 20,
    fontWeight: "500",
    width: "80%"
  },
  headerSearchSection: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: Platform.OS === "ios" ? 5 : 10,
    paddingTop: 25,
    backgroundColor: primary
  },
  providerIcon: {
    height: 30,
    width: 30,
    // position: 'absolute',
    top: 15,
    right: 30
  },
  iconArrowForward: {
    fontSize: 30,
    color: "#A9A9A9",
    flex: 1,
    marginRight: 20,
    textAlign: "right"
  },
  backgroundSection: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerBoldText: {
    alignItems: "flex-start",
    justifyContent: "center",
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  },
  headerBackBtn: {
    backgroundColor: "transparent",
    marginTop: 30,
    width: 80
  },
  headerImgSubCategory: {
    height: 200,
    width: deviceWidth,
    marginTop: Platform.OS === "ios" ? 25 : 0
  },
  headerBoldTextView: {
    height: 45,
    width: deviceWidth,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5
  },
  opacityView: {
    backgroundColor: "rgba(0,0,0,0.1)",
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  listCateView: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10
    // marginRight:10,
    // marginLeft:10
  },
  searchIconBtn: {
    marginTop: 30,
    alignItems: "center",
    height: 30,
    width: 80
  },
  searchIconProduct: {
    fontSize: 25,
    color: "#cecece",
    fontWeight: "500"
  },
  ListProductsItem: {
    marginRight: 10,
    marginLeft: 10
  },
  providerBtn: {
    height: 300,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#e6e7ef",
    alignSelf: "center"
  },
  providerImg: {
    height: 300,
    width: 200,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderRadius: 5
  },
  providerName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3
  },
  prodShow: {
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth,
    flexDirection: "row",
    height: 40
  },
  providerNameShow: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10
  },
  provNameText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15
  },
  bigTextHeader: {
    marginTop: 10,
    color: "black",
    fontSize: 25,
    fontWeight: "bold"
  }
};
