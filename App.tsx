import React, { useState, useCallback, useEffect } from 'react';
import { PlantInfo } from './types';
import { identifyPlant } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { PlantInfoCard } from './components/PlantInfoCard';
import { Loader } from './components/Loader';
import { LeafIcon, CloseIcon } from './components/IconComponents';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Create a URL for the image preview
        if (!imageFile) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);

        // Free memory when the component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleImageSelect = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);
        setPlantInfo(null);
        setImageFile(file);

        try {
            const result = await identifyPlant(file);
            setPlantInfo(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleClear = () => {
        setImageFile(null);
        setPreviewUrl(null);
        setPlantInfo(null);
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-emerald-50 text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
                    <LeafIcon className="w-8 h-8 text-emerald-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-800">Medicinal Plant Identifier</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
                    {!imageFile && (
                        <div className="w-full text-center">
                            <h2 className="text-3xl font-semibold mb-2">Upload an Image to Identify a Plant</h2>
                            <p className="text-lg text-gray-600 mb-6">Discover the medicinal properties of plants around you.</p>
                            <ImageUploader onImageSelect={handleImageSelect} />
                        </div>
                    )}
                    
                    {previewUrl && (
                        <div className="relative w-full max-w-lg">
                           <img src={previewUrl} alt="Plant preview" className="rounded-2xl shadow-lg w-full h-auto object-cover"/>
                           <button 
                               onClick={handleClear} 
                               className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-100 transition-colors"
                               aria-label="Clear image"
                           >
                                <CloseIcon className="w-6 h-6 text-red-500" />
                           </button>
                        </div>
                    )}

                    {isLoading && <Loader />}
                    
                    {error && (
                        <div className="w-full max-w-lg p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                            <p className="font-semibold">Identification Failed</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {plantInfo && !isLoading && (
                        <div className="w-full max-w-2xl">
                            <PlantInfoCard plantInfo={plantInfo} />
                        </div>
                    )}
                </div>
            </main>
             <footer className="text-center py-4 text-sm text-gray-500">
                <p>Powered by AI. Information provided is for educational purposes only.</p>
            </footer>
        </div>
    );
};

export default App;