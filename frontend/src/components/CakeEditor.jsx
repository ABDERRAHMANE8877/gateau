import React, { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Trash2, Plus, Download, RotateCcw } from "lucide-react"
import "../css/CakeEditor.css"

const defaultCake = [
  {
    id: "base",
    type: "cylinder",
    position: [0, -0.5, 0],
    scale: [2, 0.5, 2],
    color: "#8B4513",
    rotation: [0, 0, 0],
  },
  {
    id: "layer1",
    type: "cylinder",
    position: [0, 0, 0],
    scale: [1.8, 0.8, 1.8],
    color: "#FFB6C1",
    rotation: [0, 0, 0],
  },
  {
    id: "layer2",
    type: "cylinder",
    position: [0, 1, 0],
    scale: [1.4, 0.6, 1.4],
    color: "#FFC0CB",
    rotation: [0, 0, 0],
  },
]

const colors = [
  "#FFB6C1", "#FFC0CB", "#FF69B4", "#FF1493", "#DC143C", "#8B4513",
  "#D2691E", "#CD853F", "#F4A460", "#DEB887", "#FFFF00", "#FFD700",
  "#FFA500", "#FF4500", "#FF6347", "#90EE90", "#32CD32", "#228B22",
  "#006400", "#9ACD32", "#87CEEB", "#4169E1", "#0000FF", "#8A2BE2",
  "#9400D3", "#FFFFFF", "#D3D3D3", "#A9A9A9", "#696969", "#000000",
]

const meshTypes = [
  { value: "box", label: "Cube" },
  { value: "sphere", label: "Sphére" },
  { value: "cylinder", label: "cylindre" },
  { value: "cone", label: "Cornet" },
  { value: "torus", label: "Donut" },
]

function MeshRenderer({ component, isSelected, onSelect }) {
  const meshRef = useRef(null)

  const renderGeometry = () => {
    switch (component.type) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />
      case "cylinder":
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      case "cone":
        return <coneGeometry args={[0.5, 1, 32]} />
      case "torus":
        return <torusGeometry args={[0.4, 0.2, 16, 100]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={component.position}
      scale={component.scale}
      rotation={component.rotation}
      onClick={onSelect}
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={component.color}
        transparent={isSelected}
        opacity={isSelected ? 0.8 : 1}
        emissive={isSelected ? "#444444" : "#000000"}
      />
      {isSelected && (
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshBasicMaterial color="#ffff00" wireframe />
        </mesh>
      )}
    </mesh>
  )
}

export default function CakeEditor() {
  const [components, setComponents] = useState(defaultCake)
  const [selectedId, setSelectedId] = useState(null)
  const [newMeshType, setNewMeshType] = useState("box")

  const selectedComponent = components.find((c) => c.id === selectedId)

  const addComponent = () => {
    const getTopPosition = () => {
      if (components.length === 0) return 2
      let maxY = -Infinity
      components.forEach((component) => {
        const componentTop = component.position[1] + component.scale[1] / 2
        if (componentTop > maxY) maxY = componentTop
      })
      return maxY + 0.8
    }
    const newComponent = {
      id: `component-${Date.now()}`,
      type: newMeshType,
      position: [0, getTopPosition(), 0],
      scale: [0.5, 0.5, 0.5],
      color: "#FFB6C1",
      rotation: [0, 0, 0],
    }
    setComponents([...components, newComponent])
    setSelectedId(newComponent.id)
  }

  const deleteComponent = (id) => {
    setComponents(components.filter((c) => c.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const updateComponent = (id, updates) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const resetCake = () => {
    setComponents(defaultCake)
    setSelectedId(null)
  }

  const saveCake = () => {
    const dataStr = JSON.stringify(components, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "my-cake.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="cake-editor">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {components.map((component) => (
            <MeshRenderer
              key={component.id}
              component={component}
              isSelected={selectedId === component.id}
              onSelect={() => setSelectedId(component.id)}
            />
          ))}

          <OrbitControls enablePan enableZoom enableRotate />
          <Environment preset="studio" />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
        </Canvas>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="panel-section">
          <div className="panel-header">
            <h2>Gâteau</h2>
          </div>
          <div className="panel-buttons">
            <button onClick={resetCake} className="btn-outline btn-sm">
              <RotateCcw className="icon" />
              Remise à zéro
            </button>
            <button onClick={saveCake} className="btn-outline btn-sm">
              <Download className="icon" />
              Enregistrer
            </button>
          </div>
        </div>

        <div className="panel-section">
          <h3>Ajouter un composant</h3>
          <select
            value={newMeshType}
            onChange={(e) => setNewMeshType(e.target.value)}
            className="select"
          >
            {meshTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <button onClick={addComponent} className="btn-full btn-primary">
            <Plus className="icon" />
            Ajouter Composant
          </button>
        </div>

        <div className="panel-section">
          <h3>Composants ({components.length})</h3>
          <div className="component-list">
            {components.map((component) => (
              <div
                key={component.id}
                className={`component-item ${
                  selectedId === component.id ? "selected" : ""
                }`}
                onClick={() => setSelectedId(component.id)}
              >
                <div className="component-info">
                  <div
                    className="color-box"
                    style={{ backgroundColor: component.color }}
                  />
                  <span>{meshTypes.find((t) => t.value === component.type)?.label}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                  className="btn-ghost btn-sm btn-icon"
                  title="Delete"
                >
                  <Trash2 className="icon-small" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedComponent && (
          <div className="panel-section">
            <h3>Editer Composant</h3>

            <label>Type du Componsant</label>
            <select
              value={selectedComponent.type}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { type: e.target.value })
              }
              className="select"
            >
              {meshTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <label>Glaçage</label>
            <div className="color-picker">
              <div
                className="current-color"
                style={{ backgroundColor: selectedComponent.color }}
              >
                Glaçage actuel
              </div>
              <div className="color-grid">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-button ${
                      selectedComponent.color === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateComponent(selectedComponent.id, { color })}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <label>Glaçage personnalisé (couleur)</label>
            <input
              type="color"
              value={selectedComponent.color}
              onChange={(e) => updateComponent(selectedComponent.id, { color: e.target.value })}
              className="color-input"
            />

            <label>Position</label>
            <div className="range-grid">
              {["X", "Y", "Z"].map((axis, i) => (
                <div key={axis} className="range-control">
                  <span>{axis}</span>
                  <input
                    type="range"
                    min={axis === "X" || axis === "Z" ? -5 : -5}
                    max={5}
                    step={0.1}
                    value={selectedComponent.position[i]}
                    onChange={(e) => {
                      const newPos = [...selectedComponent.position]
                      newPos[i] = parseFloat(e.target.value)
                      updateComponent(selectedComponent.id, { position: newPos })
                    }}
                  />
                </div>
              ))}
            </div>

            <label>Échelle</label>
            <div className="range-grid">
              {["X", "Y", "Z"].map((axis, i) => (
                <div key={axis} className="range-control">
                  <span>{axis}</span>
                  <input
                    type="range"
                    min={0.1}
                    max={3}
                    step={0.1}
                    value={selectedComponent.scale[i]}
                    onChange={(e) => {
                      const newScale = [...selectedComponent.scale]
                      newScale[i] = parseFloat(e.target.value)
                      updateComponent(selectedComponent.id, { scale: newScale })
                    }}
                  />
                </div>
              ))}
            </div>

            <label>Rotation</label>
            <div className="range-grid">
              {["X", "Y", "Z"].map((axis, i) => (
                <div key={axis} className="range-control">
                  <span>{axis}</span>
                  <input
                    type="range"
                    min={0}
                    max={Math.PI * 2}
                    step={0.1}
                    value={selectedComponent.rotation[i]}
                    onChange={(e) => {
                      const newRot = [...selectedComponent.rotation]
                      newRot[i] = parseFloat(e.target.value)
                      updateComponent(selectedComponent.id, { rotation: newRot })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
