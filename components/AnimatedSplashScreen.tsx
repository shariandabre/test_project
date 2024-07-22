import { View } from 'react-native';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({
  onAnimationFinish = (isCancelled) => { },
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <AnimatedLottieView
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/netfilx.json')}
      />
    </View>
  );
};

export default AnimatedSplashScreen;
