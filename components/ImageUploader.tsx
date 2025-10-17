
import React, { useRef, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onImageSelect(event.target.files[0]);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            onImageSelect(event.dataTransfer.files[0]);
        }
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div 
            className={`w-full max-w-lg p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-gray-50'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <UploadIcon className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Drag & Drop an image here</h3>
                <p className="text-gray-500 mt-1">or</p>
                <button
                    onClick={handleBrowseClick}
                    className="mt-4 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 transition-colors"
                >
                    Browse File
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                 <p className="text-xs text-gray-400 mt-4">Supports: PNG, JPG, WEBP</p>
            </div>
        </div>
    );
};
