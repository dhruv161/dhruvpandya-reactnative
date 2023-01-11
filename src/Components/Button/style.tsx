import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import theme from 'src/Utils/theme';
import fonts from 'src/Utils/fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.BLACK,
    height: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: verticalScale(10)
  },
  btnText: {
    color: theme.WHITE,
    fontSize: verticalScale(14),
    fontFamily: fonts.montserrat_Medium,
    textAlign: 'center',
  },
  btnAligned: {alignSelf: 'center'},
});
export default styles;
