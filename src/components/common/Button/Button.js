import {Button as GIButton, ButtonText, Spinner} from '@gluestack-ui/themed';

const Button = ({
  onPress,
  loadingText = 'Please Wait',
  showLoading = false,
  bgColor = '$primary400',
  buttonText = '',
  variant = 'solid',
  disabled = false,
  guiButtonProps,
  children,
}) => {
  return (
    <GIButton
      isDisabled={disabled}
      borderRadius={12}
      variant={variant}
      bgColor={variant === 'outline' ? undefined : bgColor}
      color={variant === 'outline' ? bgColor : undefined}
      height={55}
      shadowColor={variant === 'outline' ? undefined : '$primary700'}
      shadowOffset={variant === 'outline' ? undefined : {width: 0, height: 12}}
      elevation={variant === 'outline' ? undefined : 12}
      onPress={onPress}
      $active-bg="$primary600"
      $_text-active-color="$white"
      {...guiButtonProps}>
      {showLoading ? (
        <>
          <Spinner color="$white" mr={6} />
          <ButtonText fontWeight="light">{loadingText}</ButtonText>
        </>
      ) : (
        <ButtonText fontSize={18} fontWeight="light">
          {buttonText || children}
        </ButtonText>
      )}
    </GIButton>
  );
};

export default Button;
