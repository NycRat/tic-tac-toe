import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useRef, useState } from "react";
import BlockGrid from './BlockGrid';

export enum Team {
  'None', 'O', 'X', 'line'
}

export interface BlockInfo {
  position: Vector3,
  team: Team
};

const Scene = () => {

  const { viewport } = useThree();

  const spacing: number = 1.4;

  const [turn, setTurn] = useState<number>(0);
  const [winner, setWinner] = useState<Team>(Team.None)
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

  const turnPassed = useRef(false);

  const setLine = (a: number, b: number, c: number) => {
    let newBlocks = [...blocks];
    newBlocks[a].team = Team.line;
    newBlocks[b].team = Team.line;
    newBlocks[c].team = Team.line;
    setBlocks(newBlocks);
  }

  const checkWin = (): Team => {
    let team: Team;
    // rows
    for (let i = 0; i < 3; i++) {
      team = blocks[i * 3].team;
      if (team === Team.None) {
        continue;
      }
      for (let j = 0; j < 3; j++) {
        if (team !== blocks[i * 3 + j].team) {
          break;
        }
        if (j === 2) {
          setLine(i * 3 + 0, i * 3 + 1, i * 3 + 2);
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
          setLine(i + 0, i + 3, i + 6);
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
    if (team !== Team.None) {
      setLine(0, 4, 8);
      return team;
    }
    if (tempTeam !== Team.None) {
      setLine(2, 4, 6);
      return tempTeam;
    }
    return Team.None;
  }

  const handleBlockClick = (index: number): void => {
    let newBlocks = [...blocks];
    if (newBlocks[index].team === Team.None && !turnPassed.current) {
      turnPassed.current = true;
      newBlocks[index].team = turn % 2 + 1;
      setBlocks(newBlocks);
      setWinner(checkWin());
      setTurn(turn + 1);
      if (turn >= 9) {
        console.log('GAME DONE');
      }
    }
  }

  const resetGame = () => {
    let newBlocks = [...blocks];
    for (let i = 0; i < newBlocks.length; i++) {
      newBlocks[i].team = Team.None;
    }
    setBlocks(newBlocks);
    setTurn(0);
    setWinner(Team.None);
  }

  useFrame((state, delta) => {
    turnPassed.current = false;
    // console.log(cameraPos.z);
    if (state.camera.position.z > 5) {
      // WOAH ZOOM IN PART
      let speed = 500;
      speed = state.camera.position.z * 1.5 + 70;
      if (state.camera.position.z - speed * delta <= 5) {
        state.camera.position.z = 5;
        return;
      }
      state.camera.position.z = state.camera.position.z - speed * delta;
      state.camera.position.y = 0;
      return;
    }
    if (state.camera.position.z <= -1.2) {
      // THE ONE TIME ZOOM OUT
      state.camera.position.z = 2000;
      state.camera.position.y = 50;
      resetGame();
      return;
    }
    if (winner !== Team.None || turn >= 9) {
      state.camera.position.z = state.camera.position.z - 2 * delta;
    }
  });

  const shortestLen = Math.min(viewport.width, viewport.height);

  return (
    <group scale={shortestLen >= 5 ? 1 : shortestLen / 5}>
      <BlockGrid blocks={blocks} onBlockClick={winner === Team.None ? handleBlockClick : (index: number) => { }} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} />

    </group>
  );

}

export default Scene;
