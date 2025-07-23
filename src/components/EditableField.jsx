import React, { useState } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';

const EditableField = ({ initialValue, onSave, inputClass = "bg-slate-600 text-white p-1 rounded", textClass = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      // ---- SE AÑADIÓ LA CORRECCIÓN AQUÍ ----
      // Este div ahora detiene cualquier clic que ocurra dentro de él
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className={inputClass}
        />
        <button onClick={handleSave} className="text-green-400 hover:text-green-300"><FiCheck /></button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-2 group cursor-pointer" 
      onClick={(e) => {
        e.stopPropagation(); // Detiene la propagación al entrar en modo edición
        setIsEditing(true);
      }}
    >
      <p className={textClass}>{initialValue}</p>
      <FiEdit2 className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default EditableField;