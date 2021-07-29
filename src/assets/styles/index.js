import { StyleSheet, Dimensions } from "react-native";

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

const ICON_FONT = "tinderclone";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;


const PURPLE = "#600EE6";
const ERROR = "#f13a59";
const SURFACE = "#fff";
const SUPER_ALPHA_COLOR = "#E02224";
const TEXT_COLOR = 'rgb(51,39,88)';
const BORDER_COLOR = '#CCCCCC';


export default StyleSheet.create({
	iconMenu: {
		//fontFamily: ICON_FONT,
		height: 20,
		paddingBottom: 7
	},
});
