import { Vector3 } from "@react-three/fiber";
import { BlockInfo } from "./App";
import Block from "./Block";

const BlockGrid = (props: { blocks: Array<BlockInfo>, onBlockClick: (index: number) => void }) => {
  return (
    props.blocks.map((value, index) => {
      return <Block key={index} info={value} onClick={() => props.onBlockClick(index)} />
    })
  );
}

export default BlockGrid;