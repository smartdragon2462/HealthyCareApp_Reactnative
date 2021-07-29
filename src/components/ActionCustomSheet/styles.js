import { StyleSheet } from 'react-native';

export const hairlineWidth = StyleSheet.hairlineWidth;

export const baseStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginBottom: 10,

  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  titleText: {
    color: '#8f8f8f',
    fontSize: 13,
    fontWeight: '600',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  messageText: {
    color: '#8f8f8f',
    fontSize: 13,
    textAlign: 'center',
  },

  optionsContainer: {
    borderRadius: 12,
 },
  options: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    // marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 30,

  },
  buttonTitle: {
    fontSize: 20,
  },

  cancelButton: {
    borderRadius: 12,
  },
  cancelTitle: {
    fontWeight: '600',
  },
});

export const androidStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 8,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  buttonContainer: {
    // marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // paddingHorizontal: 30,
    // padding:20,
    // width:'100%',
  },

  cancelButton: {},
});
