import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";

export default function SceneCamera(props: { position: Vector3 }) {

  const { camera } = useThree();

  console.log(props.position);
  camera.position.x = props.position.x;
  camera.position.y = props.position.y;
  camera.position.z = props.position.z;
  // useFrame(() => {
  // });
  return null;
}
