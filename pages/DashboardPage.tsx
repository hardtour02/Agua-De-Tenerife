import React from 'react';
import KpiCard from '../components/KpiCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { flowData, tankData, assetStatusData, pressureData } from '../constants';
import { WaterIcon, PressureIcon, TankIcon } from '../components/icons';

const StatusIndicator: React.FC<{ name: string; status: string }> = ({ name, status }) => {
    const statusConfig: { [key: string]: { color: string; text: string } } = {
        Normal: { color: 'bg-sustainable-green', text: 'Normal' },
        Alarma: { color: 'bg-alarm-red', text: 'Alarma' },
        Mantenimiento: { color: 'bg-warning-yellow', text: 'Mantenimiento' },
    };
    const config = statusConfig[status] || { color: 'bg-inactive-gray', text: 'Desconocido' };

    return (
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <span className="text-text-secondary">{name}</span>
            <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${config.color}`}></div>
                <span className="font-medium text-white">{config.text}</span>
            </div>
        </div>
    );
};


const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KpiCard title="Consumo Total de Agua" value="1,234" unit="m³" icon={<WaterIcon className="w-8 h-8 text-white" />} color="bg-water-blue" />
                <KpiCard title="Presión Media" value="5.8" unit="bar" icon={<PressureIcon className="w-8 h-8 text-white" />} color="bg-sustainable-green" />
                <KpiCard title="Depósitos Activos" value="10" unit="/ 12" icon={<TankIcon className="w-8 h-8 text-white" />} color="bg-graph-pink" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card-panel p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Caudal (últimas 24h)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={flowData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#B3C2D6" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#B3C2D6" tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1E273C', border: '1px solid #374151' }} />
                            <Legend />
                            <Line type="monotone" dataKey="value" name="Caudal (L/s)" stroke="#4EC8E8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-card-panel p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Estado de Depósitos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tankData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis type="number" stroke="#B3C2D6" tick={{ fontSize: 12 }}/>
                            <YAxis type="category" dataKey="name" stroke="#B3C2D6" tick={{ fontSize: 12 }}/>
                            <Tooltip contentStyle={{ backgroundColor: '#1E273C', border: '1px solid #374151' }} cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} />
                            <Bar dataKey="value" name="Cantidad" barSize={30} radius={[0, 10, 10, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card-panel p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Presión (últimas 24h)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={pressureData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#B3C2D6" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#B3C2D6" tick={{ fontSize: 12 }} domain={['dataMin - 0.5', 'dataMax + 0.5']}/>
                            <Tooltip contentStyle={{ backgroundColor: '#1E273C', border: '1px solid #374151' }} />
                            <Legend />
                            <Bar dataKey="value" name="Presión (bar)" fill="#00C8A0" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-card-panel p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Estado de Activos Principales</h3>
                    <div className="space-y-2">
                        {assetStatusData.map(asset => (
                            <StatusIndicator key={asset.name} name={asset.name} status={asset.status} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;