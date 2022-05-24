import {useHref, useLinkClickHandler} from 'react-router-dom';
import {Link as ChakraLink, forwardRef} from '@chakra-ui/react';

/**
 * Use as combination of Chakra's Link (styling) and react-router's Link (navigation)
 *
 * https://reactrouter.com/docs/en/v6/upgrading/v5#remove-link-component-prop
 */

export const Link = forwardRef(({onClick, replace = false, state, target, to, ...rest}, ref) => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });

  return (
    <ChakraLink
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
      ref={ref}
      target={target}
    />
  );
});
