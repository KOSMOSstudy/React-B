import {useRecoilState} from "recoil";

import {textState} from "../sotre/textState";

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);

  const handleChange = ({target: {value}}) => {
    setText(value);
  }

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
      <br/>
      Echo: {text}
    </>
  );
}

export default TextInput;