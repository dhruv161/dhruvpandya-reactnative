import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import theme from 'src/Utils/theme';
import fonts from 'src/Utils/fonts';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND,
    paddingHorizontal: verticalScale(20),
  },

  titleContainer: {
    padding: verticalScale(10),
    backgroundColor: theme.BLACK,
    position: 'absolute',
    bottom: 0,
    width: width / 2.3,
  },
  title: {
    fontFamily: fonts.montserrat_Regular,
    color: theme.WHITE,
    marginBottom: verticalScale(6),
    fontSize: verticalScale(12),
  },
  noData: {
    fontFamily: fonts.montserrat_Bold,
    color: theme.BLACK,
    fontSize: verticalScale(18),
    textAlign: 'center',
  },
  mainCardView: {
    width: width / 2.3,
    height: verticalScale(250),
    backgroundColor: theme.WHITE,
    marginVertical: verticalScale(10),
    marginRight: verticalScale(10)
  },
  itemView: {
    flexDirection: 'row',
    height: verticalScale(55),
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: verticalScale(120),
    width: verticalScale(120),
    resizeMode: 'contain'
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: verticalScale(30),
    right: verticalScale(30)
  },
  emptyItemContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
   }
});
export default styles;
