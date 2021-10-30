import {atom, selector} from "recoil";

export const textState = atom({
  key: 'textState-textState',
  default: '',
});

export const charCountState = selector({
  key: 'textState-charCountState',
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});