import { BlockInfo } from "./Scene";
import Block from "./Block";

const BlockGrid = (props: { blocks: Array<BlockInfo>, onBlockClick: (index: number) => void }) => {
  return (
    <group>
      {props.blocks.map((value, index) => {
        return <Block key={index} info={value} onClick={() => props.onBlockClick(index)} />
      })}
    </group>
  );
}

export default BlockGrid;