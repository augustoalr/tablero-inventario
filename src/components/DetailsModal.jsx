import { FiX } from 'react-icons/fi';
import EditableField from './EditableField'; 

const DetailsModal = ({ office, onClose, onUpdateData }) => {
  if (!office) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <EditableField
            initialValue={office.name}
            onSave={(newValue) => onUpdateData('name', newValue)}
            textClass="text-2xl font-bold text-white"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white"><FiX size={24} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">Fecha de Inicio</p>
            <EditableField
              initialValue={office.startDate || "No definida"}
              onSave={(newValue) => onUpdateData('startDate', newValue)}
              textClass="text-lg text-white"
            />
          </div>
          <div>
            <p className="text-sm text-slate-400">Fecha de Culminación</p>
            <EditableField
              initialValue={office.completionDate || "Pendiente"}
              onSave={(newValue) => onUpdateData('completionDate', newValue)}
              textClass="text-lg text-white"
            />
          </div>
          <div>
            <p className="text-sm text-slate-400">Cantidad de Obras</p>
            {/* --- CAMBIO AQUÍ --- */}
            <EditableField
              initialValue={office.artworkCount !== undefined ? office.artworkCount : 0}
              onSave={(newValue) => onUpdateData('artworkCount', newValue)}
              textClass="text-lg text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;