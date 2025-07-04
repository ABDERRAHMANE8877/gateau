import { Link, useNavigate } from "react-router-dom";
import React ,{Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls , Environment, ContactShadows} from '@react-three/drei'
import Scene from '../../3dModel/Scene.jsx'
import "../../css/Hero.css"
import Avis from '../../assets/icons/avis.png'

const Hero = () => {
  return (
    <div className='heroContainer'>
        <div className='leftHero'>
            <h2>CREEZ VOTRE <span className='custom1'>GATEAU</span> 3D AVEC <span className='custom2'>Style</span> </h2>
            <p>Bienvenue sur notre site unique dédié aux gâteaux, où vous pouvez personnaliser vos créations en 3D pour un rendu réaliste et entièrement sur-mesure !</p>
            <div>
                <button><Link to={"/personnaliser"}>Creer maintenant</Link></button>
                <button><Link to={"/about"}>en savoir plus</Link></button>
            </div>
            <div className='avisHero'>
                <img src={Avis} alt="img/png" />
            </div>
        </div>
        <div className='rightHero'>
          <Canvas
            camera={{ position: [0, 5, 5], fov: 50 }} 
          >
            <ambientLight />
            <OrbitControls enableZoom={false} autoRotate  autoRotateSpeed={0.5}/>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
            <Environment preset='sunset' />
            <ContactShadows position={[0,-1,0]} opacity={1} scale={10} blur={1} far={10} resolution={256} color="#0" />
          </Canvas>
        </div>
    </div>
  )
}

export default Hero