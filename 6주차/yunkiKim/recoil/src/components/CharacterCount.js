import {charCountState} from "../sotre/textState";
import {useRecoilValue} from "recoil";

const CharacterCount = () => {
  const count = useRecoilValue(charCountState);

  return (
    <>
      Character Count: {count}
    </>
  );
}

export default CharacterCount;