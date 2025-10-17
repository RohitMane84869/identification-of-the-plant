
import React from 'react';
import { PlantInfo } from '../types';
import { LeafIcon } from './IconComponents';

interface PlantInfoCardProps {
    plantInfo: PlantInfo;
}

export const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ plantInfo }) => {
    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-100 rounded-full mr-4">
                        <LeafIcon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{plantInfo.plantName}</h2>
                        <p className="text-md sm:text-lg text-gray-500 italic">{plantInfo.scientificName}</p>
                    </div>
                </div>
                
                <div className="space-y-6 mt-6">
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{plantInfo.description}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-2">Medicinal Uses</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            {plantInfo.medicinalUses.map((use, index) => (
                                <li key={index} className="text-gray-600">{use}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
