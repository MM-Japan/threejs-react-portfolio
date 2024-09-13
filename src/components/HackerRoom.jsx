import React from "react";
import { useGLTF, useTexture } from '@react-three/drei';

const HackerRoom = ({ activeSection }) => {
  const { nodes, materials } = useGLTF('/models/hacker-room.glb');

  // Load textures within the Canvas context
  const homeTexture = useTexture('/textures/desk/screen.png');
  const aboutTexture = useTexture('/textures/desk/about.png');
  const workTexture = useTexture('/textures/desk/work.png');
  const contactTexture = useTexture('/textures/desk/contact.png');

  // Choose the right texture based on the active section
  const screenTexture = {
    home: homeTexture,
    about: aboutTexture,
    work: workTexture,
    contact: contactTexture
  }[activeSection];

  return (
    <group dispose={null}>
      <mesh geometry={nodes.screen_screens_0.geometry} material={materials.screens}>
        <meshMatcapMaterial map={screenTexture} /> {/* Use the passed screen texture */}
      </mesh>
      <mesh geometry={nodes.screen_glass_glass_0.geometry} material={materials.glass} />
      <mesh geometry={nodes.table_table_mat_0_1.geometry} material={materials.table_mat} />
      <mesh geometry={nodes.table_table_mat_0_2.geometry} material={materials.computer_mat} />
      <mesh geometry={nodes.table_table_mat_0_3.geometry} material={materials.server_mat} />
      <mesh geometry={nodes.table_table_mat_0_4.geometry} material={materials.vhsPlayer_mat} />
      <mesh geometry={nodes.table_table_mat_0_5.geometry} material={materials.stand_mat} />
      <mesh geometry={nodes.table_table_mat_0_6.geometry} material={materials.mat_mat} />
      <mesh geometry={nodes.table_table_mat_0_7.geometry} material={materials.arm_mat} />
      <mesh geometry={nodes.table_table_mat_0_8.geometry} material={materials.tv_mat} />
      <mesh geometry={nodes.table_table_mat_0_9.geometry} material={materials.cables_mat} />
      <mesh geometry={nodes.table_table_mat_0_10.geometry} material={materials.props_mat} />
      <mesh geometry={nodes.table_table_mat_0_11.geometry} material={materials.ground_mat} />
      <mesh geometry={nodes.table_table_mat_0_12.geometry} material={materials.key_mat} />
    </group>
  );
};
useGLTF.preload('/models/hacker-room.glb');

export default HackerRoom;
