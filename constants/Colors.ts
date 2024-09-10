/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import MapInformation  from './MapaPathsComarques.json';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';


type MapInformationType = {
  [key: string]: {
    friend: string;
    unfriend: string;
    name: string;
    d: string;
  };
};

const mapInformation: MapInformationType = MapInformation;

type ColorsType = {
  light: {
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  dark: {
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  [key: string]: any; // Allow additional properties of any type
};

const Colors: ColorsType = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

Object.keys(mapInformation).forEach((key) => {
  Colors[key] =  {
    friend: mapInformation[key].friend,
    unfriend: Colors[key] = mapInformation[key].unfriend,
  }
});

export default Colors;