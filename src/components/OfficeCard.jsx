import { FiExternalLink, FiInfo, FiTrash2 } from 'react-icons/fi';
import EditableField from './EditableField';

const statusStyles = {
  pending: { bg: 'bg-slate-800 hover:bg-slate-700', text: 'text-slate-300', label: 'Pendiente', labelColor: 'bg-slate-600' },
  waiting: { bg: 'bg-amber-800/50 hover:bg-amber-700/60 border-amber-500', text: 'text-amber-200', label: 'Esperando Firma', labelColor: 'bg-amber-500' },
  completed: { bg: 'bg-green-800/50 hover:bg-green-700/60 border-green-500', text: 'text-green-200', label: 'Completado', labelColor: 'bg-green-500' },
};

const OfficeCard = ({ id, office, status, onStatusClick, onShowDetails, onUpdateData, onDelete }) => {
  const styles = statusStyles[status] || statusStyles['pending'];

  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    if (action) action();
  };
  
  return (
    <div onClick={() => onStatusClick(id)} className={`relative p-5 rounded-lg shadow-lg cursor-pointer transition-all duration-300 border border-transparent ${styles.bg} ${styles.text} flex flex-col justify-between h-48 group`}>
      
      <button onClick={(e) => handleButtonClick(e, onDelete)} className="absolute top-2 right-2 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiTrash2/>
      </button>

      <div>
        <div className="flex justify-between items-start mb-2">
          <EditableField
            initialValue={office.name}
            onSave={(newValue) => onUpdateData('name', newValue)}
            textClass="font-bold text-lg text-white"
          />
          <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full h-6`}>{styles.label}</span>
        </div>
        <EditableField
          initialValue={office.responsible}
          onSave={(newValue) => onUpdateData('responsible', newValue)}
          textClass="text-sm"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <a href={office.driveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => handleButtonClick(e)} className="flex-1 flex items-center justify-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors bg-slate-700/50 hover:bg-slate-600/50 py-2 rounded-md">
          <FiExternalLink /> Ver Documento
        </a>
        <button onClick={(e) => handleButtonClick(e, onShowDetails)} className="flex-1 flex items-center justify-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors bg-slate-700/50 hover:bg-slate-600/50 py-2 rounded-md">
          <FiInfo /> Detalles
        </button>
      </div>
    </div>
  );
};

export default OfficeCard;