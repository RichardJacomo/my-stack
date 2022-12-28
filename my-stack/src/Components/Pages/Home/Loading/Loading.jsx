import load from "../../../../Assets/load.png";
import { Figure } from "../../../../Styles/Loading";

export const Loading = () => {
  return (
    <>
      <Figure>
        <img src={load} alt="" />
      </Figure>
    </>
  );
};
