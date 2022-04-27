import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BlockInfo, Team } from "./Scene";

const Block = (props: { info: BlockInfo, onClick: () => void }): JSX.Element => {
  const ref = useRef<any>();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // const [color, setColor] = useState('yellow');

  useFrame((state, delta) => {
    ref.current.rotation.y += Math.random() * 2 * delta;
    ref.current.rotation.x += Math.random() * 2 * delta;
  });

  return (
    <mesh
      position={props.info.position}
      ref={ref}
      scale={1}
      onClick={(event) => { props.onClick(); click(!clicked); }}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={
        props.info.team === Team.None ? hovered ? 'orange' : 'yellow' :
          props.info.team === Team.O ? 'black' : 'white'
      } />
    </mesh>
  );
}

export default Block;