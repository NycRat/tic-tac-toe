import { Canvas, Vector3 } from '@react-three/fiber'
import { useState } from "react";
import BlockGrid from './BlockGrid';
import SceneCamera from './SceneCamera';

export enum Team {
  'None', 'O', 'X'
}

export interface BlockInfo {
  position: Vector3,
  team: Team
};

const App = (): JSX.Element => {

  const spacing: number = 1.1;

  const [cameraPos, setCameraPos] = useState<Vector3>({ x: 0, y: 0, z: 5 });
  const [turn, setTurn] = useState<number>(0);
  const [blocks, setBlocks] = useState<Array<BlockInfo>>([

    { position: [-spacing, spacing, 0], team: Team.None },
    { position: [0, spacing, 0], team: Team.None },
    { position: [spacing, spacing, 0], team: Team.None },
    { position: [-spacing, 0, 0], team: Team.None },
    { position: [0, 0, 0], team: Team.None },
    { position: [spacing, 0, 0], team: Team.None },
    { position: [-spacing, -spacing, 0], team: Team.None },
    { position: [0, -spacing, 0], team: Team.None },
    { position: [spacing, -spacing, 0], team: Team.None }
  ]);

  const checkWin = (): Team => {
    let team: Team;
    // rows
    for (let i = 0; i < 3; i++) {
      team = blocks[i * 3].team;
      if (team === Team.None) {
        break;
      }
      for (let j = 0; j < 3; j++) {
        if (team !== blocks[i * 3 + j].team) {
          break;
        }
        if (j === 2) {
          return team;
        }
      }
    }
    // columns
    for (let i = 0; i < 3; i++) {
      team = blocks[i].team;
      if (team === Team.None) {
        continue;
      }
      for (let j = 0; j < 3; j++) {
        if (team !== blocks[i + j * 3].team) {
          break;
        }
        if (j >= 2) {
          return team;
        }
      }
    }
    let tempTeam: Team = blocks[2].team;
    team = blocks[0].team;
    for (let i = 1; i < 3; i++) {
      if (team !== blocks[i + i * 3].team) {
        team = Team.None;
      }
      if (tempTeam !== blocks[2 - i + i * 3].team) {
        tempTeam = Team.None;
      }
    }
    return team !== Team.None ? team : tempTeam !== Team.None ? tempTeam : Team.None;
  }

  const onBlockClick = (index: number): void => {
    let newBlocks = [...blocks];
    if (newBlocks[index].team === Team.None) {
      newBlocks[index].team = turn % 2 + 1;
      setBlocks(newBlocks);
      console.log(checkWin());
      setTurn(turn + 1);
      if (turn >= 9) {
        console.log('GAME DONE');
      }
    }
  }

  return (
    <Canvas>

      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {BlockGrid({ blocks: blocks, onBlockClick: onBlockClick })}
      <SceneCamera position={cameraPos} />
    </Canvas >
  );
}

export default App;