

import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Widget, WidgetType, VariableType } from '../types';
import { PlusIcon } from '../components/icons';
import { initialWidgets } from '../constants';

const SettingsPage: React.FC = () => {
    const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

    const [widgetData, setWidgetData] = useState({
        variable: 'Caudal' as VariableType,
        type: 'Line' as WidgetType,
        color: '#4EC8E8',
        unit: 'L/s',
        scaleMin: '',
        scaleMax: ''
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingWidget(null);
    };

    const handleOpenAddModal = () => {
        setEditingWidget(null);
        setWidgetData({
            variable: 'Caudal',
            type: 'Line',
            color: '#4EC8E8',
            unit: 'L/s',
            scaleMin: '',
            scaleMax: ''
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (widget: Widget) => {
        setEditingWidget(widget);
        setWidgetData({
            variable: widget.variable,
            type: widget.type,
            color: widget.color || '',
            unit: widget.unit || '',
            scaleMin: widget.scaleMin?.toString() || '',
            scaleMax: widget.scaleMax?.toString() || ''
        });
        setIsModalOpen(true);
    };

    const handleSaveWidget = () => {
        const name = `${widgetData.variable} (${widgetData.unit})`;
        const updatedWidgetData = {
            name,
            variable: widgetData.variable,
            type: widgetData.type,
            color: widgetData.color,
            unit: widgetData.unit,
            scaleMin: widgetData.scaleMin ? parseFloat(widgetData.scaleMin) : undefined,
            scaleMax: widgetData.scaleMax ? parseFloat(widgetData.scaleMax) : undefined,
        };

        if (editingWidget) {
            setWidgets(widgets.map(w => w.id === editingWidget.id ? { ...w, ...updatedWidgetData } : w));
        } else {
            const newId = widgets.length > 0 ? Math.max(...widgets.map(w => w.id)) + 1 : 1;
            setWidgets([...widgets, { id: newId, ...updatedWidgetData }]);
        }
        
        handleCloseModal();
    };
    
    const getChartTypeDescription = (type: WidgetType) => {
        switch (type) {
            case 'Line': return 'Gráfico de líneas';
            case 'Bar': return 'Gráfico de barras';
            case 'Pie': return 'Gráfico de tarta';
            default: return 'Gráfico';
        }
    };

    return (
        <>
            <div className="bg-card-panel p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Configurar Dashboard</h2>
                    <button 
                        onClick={handleOpenAddModal}
                        className="flex items-center bg-graph-blue-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Añadir nuevo widget
                    </button>
                </div>
                
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-text-secondary mb-2">Widgets configurados</h3>
                    {widgets.length > 0 ? widgets.map(widget => (
                        <div key={widget.id} className="flex items-center justify-between bg-background-main p-4 rounded-lg">
                            <div>
                                <span className="font-medium text-white">{widget.variable}</span>
                                <p className="text-sm text-text-secondary">{getChartTypeDescription(widget.type)}</p>
                            </div>
                             <div className="flex items-center space-x-2">
                                <button onClick={() => handleOpenEditModal(widget)} className="text-water-blue text-sm font-semibold hover:underline">Editar</button>
                                <button className="text-alarm-red text-sm font-semibold hover:underline">Eliminar</button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-text-secondary text-center py-4">No hay widgets configurados.</p>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingWidget ? "Editar Widget" : "Añadir Nuevo Widget"}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="variable" className="block text-sm font-medium text-text-secondary mb-2">Seleccionar variable</label>
                        <select 
                            id="variable" 
                            value={widgetData.variable}
                            onChange={(e) => setWidgetData({...widgetData, variable: e.target.value as VariableType})}
                            className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                        >
                            <option>Caudal</option>
                            <option>Presión</option>
                            <option>Temperatura</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="chartType" className="block text-sm font-medium text-text-secondary mb-2">Seleccionar tipo de gráfico</label>
                        <select 
                            id="chartType" 
                            value={widgetData.type}
                            onChange={(e) => setWidgetData({...widgetData, type: e.target.value as WidgetType})}
                            className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                        >
                            <option value="Line">Líneas</option>
                            <option value="Bar">Barras</option>
                            <option value="Pie">Tarta</option>
                        </select>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 space-y-4">
                        <h4 className="font-semibold text-text-secondary">Opciones Adicionales</h4>
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-text-secondary mb-2">Color</label>
                            <input 
                                id="color"
                                type="text"
                                value={widgetData.color}
                                onChange={(e) => setWidgetData({...widgetData, color: e.target.value})}
                                placeholder="#4EC8E8"
                                className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                            />
                        </div>
                         <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-text-secondary mb-2">Unidad</label>
                            <input 
                                id="unit"
                                type="text"
                                value={widgetData.unit}
                                onChange={(e) => setWidgetData({...widgetData, unit: e.target.value})}
                                placeholder="e.g., L/s, bar, °C"
                                className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label htmlFor="scaleMin" className="block text-sm font-medium text-text-secondary mb-2">Escala (Mín.)</label>
                                <input 
                                    id="scaleMin"
                                    type="number"
                                    value={widgetData.scaleMin}
                                    onChange={(e) => setWidgetData({...widgetData, scaleMin: e.target.value})}
                                    placeholder="Auto"
                                    className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                                />
                            </div>
                            <div>
                               <label htmlFor="scaleMax" className="block text-sm font-medium text-text-secondary mb-2">Escala (Máx.)</label>
                                <input 
                                    id="scaleMax"
                                    type="number"
                                    value={widgetData.scaleMax}
                                    onChange={(e) => setWidgetData({...widgetData, scaleMax: e.target.value})}
                                    placeholder="Auto"
                                    className="w-full bg-background-main text-white border border-gray-600 rounded-lg p-2.5 focus:ring-2 focus:ring-water-blue focus:border-water-blue"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button 
                            onClick={handleCloseModal}
                            className="px-4 py-2 rounded-lg text-text-secondary font-semibold hover:bg-gray-700 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSaveWidget}
                            className="px-6 py-2 rounded-lg bg-graph-blue-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SettingsPage;
