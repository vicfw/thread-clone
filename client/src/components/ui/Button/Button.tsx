import {styled} from 'nativewind';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: any;
  variant: 'primary';
}

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export const MyButton = ({variant, children, ...props}: ButtonProps) => {
  const theme = {
    primary: 'black',
  };

  return (
    <StyledTouchableOpacity
      className={
        ` flex justify-center items-center h-9 rounded-lg bg-${theme[variant]} ` +
        props.className
      }
      {...props}>
      <StyledText className="text-white">{children}</StyledText>
    </StyledTouchableOpacity>
  );
};
