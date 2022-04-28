import { BlockInfo } from "./Scene";
import Block from "./Block";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const BlockGrid = (props: { blocks: Array<BlockInfo>, onBlockClick: (index: number) => void }) => {

  // const thing = 
  const ref = useRef({ x: 0, y: 0, z: 0 });

  useFrame((state, delta) => {
    // console.log()
    ref.current.x += 3 * delta;
    ref.current.x %= Math.PI * 2;
    ref.current.y += 2 * delta;
    ref.current.y %= Math.PI * 2;
    ref.current.z += 2 * delta;
    ref.current.z %= Math.PI * 2;
  });

  return (
    <group>
      {props.blocks.map((value, index) => {
        return <Block key={index} info={value} onClick={() => props.onBlockClick(index)} rotation={ref.current} />
      })}
    </group>
  );
}

export default BlockGrid;
