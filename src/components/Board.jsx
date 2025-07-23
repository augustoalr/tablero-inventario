import React, { useState, useEffect } from 'react';
import OfficeCard from './OfficeCard';
import DetailsModal from './DetailsModal';
import EditableField from './EditableField'; 
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const Board = ({ initialData }) => {
  // Estado principal de los datos de oficinas y pisos
  const [officeData, setOfficeData] = useState(() => {
    const savedData = localStorage.getItem('officeData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Estado para los colores/estatus de las tarjetas
  const [statuses, setStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem('officeStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  });

  // Estado para manejar el modal de detalles
  const [selectedOffice, setSelectedOffice] = useState(null);

  // Guardar en localStorage cada vez que algo cambie
  useEffect(() => {
    localStorage.setItem('officeData', JSON.stringify(officeData));
    localStorage.setItem('officeStatuses', JSON.stringify(statuses));
  }, [officeData, statuses]);

  // --- FUNCIONES DE GESTIÓN DE DATOS ---

  const handleAddFloor = () => {
    const newFloor = {
      floor: "Nuevo Piso (haz clic para editar)",
      offices: []
    };
    setOfficeData([...officeData, newFloor]);
  };

  const handleDeleteFloor = (floorIndex) => {
    if (window.confirm("¿Seguro que quieres eliminar este piso y todas sus oficinas?")) {
      const newData = officeData.filter((_, index) => index !== floorIndex);
      setOfficeData(newData);
    }
  };

  const handleAddOffice = (floorIndex) => {
    const newOffice = {
      name: "Nueva Oficina",
      responsible: "Responsable",
      driveLink: "#",
      startDate: new Date().toISOString().slice(0, 10),
      completionDate: null,
      // --- CAMBIO AQUÍ ---
      artworkCount: 0 // Inicializamos el contador en 0
    };
    const newData = [...officeData];
    newData[floorIndex].offices.push(newOffice);
    setOfficeData(newData);
  };
  
  const handleDeleteOffice = (floorIndex, officeIndex) => {
     if (window.confirm("¿Seguro que quieres eliminar esta oficina?")) {
        const newData = [...officeData];
        newData[floorIndex].offices.splice(officeIndex, 1);
        setOfficeData(newData);
     }
  };

  const updateOfficeData = (floorIndex, officeIndex, field, value) => {
    const newData = [...officeData];
    // Si el campo es 'artworkCount', nos aseguramos de que sea un número
    if (field === 'artworkCount') {
        const count = parseInt(value, 10);
        newData[floorIndex].offices[officeIndex][field] = isNaN(count) ? 0 : count;
    } else {
        newData[floorIndex].offices[officeIndex][field] = value;
    }
    setOfficeData(newData);
  };

  const updateFloorTitle = (floorIndex, newTitle) => {
    const newData = [...officeData];
    newData[floorIndex].floor = newTitle;
    setOfficeData(newData);
  };
  
  const handleStatusClick = (id) => {
    setStatuses(prev => {
      const current = prev[id] || 'pending';
      const next = current === 'pending' ? 'waiting' : current === 'waiting' ? 'completed' : 'pending';
      return { ...prev, [id]: next };
    });
  };

  return (
    <>
      <div className="mb-8 text-center">
        <button onClick={handleAddFloor} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2">
          <FiPlus />
          Añadir Piso
        </button>
      </div>

      <div className="space-y-12">
        {officeData.map((floor, floorIndex) => (
          <section key={`floor-${floorIndex}`}>
            <div className="flex justify-between items-center mb-6 border-b-2 border-slate-700 pb-2">
              <EditableField
                initialValue={floor.floor}
                onSave={(newTitle) => updateFloorTitle(floorIndex, newTitle)}
                textClass="text-2xl font-semibold text-white"
                inputClass="bg-slate-700 text-2xl font-semibold text-white p-1 rounded"
              />
              <div>
                <button onClick={() => handleAddOffice(floorIndex)} className="text-sky-400 hover:text-sky-300 mr-4 inline-flex items-center gap-2">
                    <FiPlus/> Añadir Oficina
                </button>
                <button onClick={() => handleDeleteFloor(floorIndex)} className="text-red-500 hover:text-red-400">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {floor.offices.map((office, officeIndex) => {
                const id = `${floorIndex}-${officeIndex}`;
                return (
                  <OfficeCard
                    key={`office-${id}`}
                    id={id}
                    office={office}
                    status={statuses[id]}
                    onStatusClick={handleStatusClick}
                    onShowDetails={() => setSelectedOffice({ ...office, floorIndex, officeIndex })}
                    onUpdateData={(field, value) => updateOfficeData(floorIndex, officeIndex, field, value)}
                    onDelete={() => handleDeleteOffice(floorIndex, officeIndex)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      
      {selectedOffice && (
        <DetailsModal
          office={selectedOffice}
          onClose={() => setSelectedOffice(null)}
          onUpdateData={(field, value) => updateOfficeData(selectedOffice.floorIndex, selectedOffice.officeIndex, field, value)}
        />
      )}
    </>
  );
};

export default Board;