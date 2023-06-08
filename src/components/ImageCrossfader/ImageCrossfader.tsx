import { animated, easings, useTransition } from '@react-spring/web';

const TRANSITION_DURATION = 300;

export const ImageCrossfader = ({
  images = [],
  activeImage,
  transitionConfigOverrides = {}
}) => {
  const transitions = useTransition(activeImage || images[0], {
    key: (activeImage || images[0]).url,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: TRANSITION_DURATION,
      easing: easings.linear
    },
    exitBeforeEnter: false,
    ...transitionConfigOverrides
  });

  return transitions((style, img) => (
    <animated.div style={style} className='h-full'>
      <div className='absolute w-full h-full top-0'>
        <div className='h-full'>
          <img className='block w-full h-full object-cover' src={img.src} />
        </div>
      </div>
    </animated.div>
  ));
};
