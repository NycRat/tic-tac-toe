import { useFrame, Vector3 } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BlockInfo, Team } from "./Scene";

const Block = (props: { info: BlockInfo, onClick: () => void, rotation: Vector3 }): JSX.Element => {
  const ref = useRef<any>();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // const [color, setColor] = useState('yellow');

  useFrame((state, delta) => {
    ref.current.rotation.x = props.rotation.x;
    ref.current.rotation.y = props.rotation.y;
    ref.current.rotation.z = props.rotation.z;
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
        props.info.team === Team.line ? '#3f403c' :
          props.info.team === Team.None ? hovered ? '#94948a' : '#f2f2e6' :
            props.info.team === Team.O ? '#2880bf' : '#a30309'
      } />
    </mesh>
  );
}

export default Block;