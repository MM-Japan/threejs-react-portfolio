import React from "react";
import { useGLTF, useTexture } from '@react-three/drei';

const HackerRoom = ({ activeSection }) => {
  // Use the environment variable for the correct base path, so it works for both local and GitHub Pages
  const basePath = import.meta.env.BASE_URL;

  // Load the 3D model using the correct base path
  const { nodes, materials } = useGLTF(`${basePath}models/hacker-room.glb`);

  // Load textures with the correct base path
  const homeTexture = useTexture(`${basePath}textures/desk/screen.png`);
  const aboutTexture = useTexture(`${basePath}textures/desk/about.png`);
  const workTexture = useTexture(`${basePath}textures/desk/work.png`);
  const contactTexture = useTexture(`${basePath}textures/desk/contact.png`);

  // Choose the right texture based on the active section
  const screenTexture = {
    home: homeTexture,
    about: aboutTexture,
    work: workTexture,
    contact: contactTexture
  }[activeSection];

  return (
    <group dispose={null}>
      {/* Screen Mesh */}
      {nodes.screen_screens_0?.geometry && (
        <mesh geometry={nodes.screen_screens_0.geometry}>
          <meshStandardMaterial
            map={screenTexture}  // Apply the selected texture for the screen
            roughness={0}  // Ensure no roughness
            metalness={0}  // Ensure no metallic effect
            bumpMap={null}  // Disable bump map (removing any dirt-like textures)
            normalMap={null}  // Disable normal map
            aoMap={null}  // Disable ambient occlusion map
          />
        </mesh>
      )}

      {/* Other parts of the desk */}
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

// Preload the model using the correct base path
useGLTF.preload(`${import.meta.env.BASE_URL}models/hacker-room.glb`);

export default HackerRoom;
