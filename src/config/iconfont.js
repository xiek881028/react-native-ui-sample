import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from '../icons/iconfont/iconfont_unicode.json';

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
