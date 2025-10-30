import React from 'react';
import { Camera, Plus } from 'lucide-react';
import { BiasFormData } from '../types';
import { LABELS } from '../constants/text';
import { COMMON_CLASSES, FONTS } from '../constants/styles';

interface BiasFormProps {
  currentBias: Partial<BiasFormData>;
  previewPhoto: string;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: (field: keyof BiasFormData, value: string) => void;
  onSubmit: () => void;
}

export default function BiasForm({
  currentBias,
  previewPhoto,
  onPhotoUpload,
  onFieldChange,
  onSubmit,
}: BiasFormProps) {
  return (
    <div className={`${COMMON_CLASSES.card} mb-8 border-4 border-amber-800`}>
      <h2 className="text-2xl font-bold text-amber-900 mb-4" style={FONTS.serif}>
        {LABELS.newBiasTitle}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full aspect-square border-4 border-dashed border-amber-400 rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition">
            {previewPhoto ? (
              <div className="relative w-full h-full">
                <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover rounded-lg absolute" />
                {currentBias.vintagePhoto && (
                  <img
                    src={currentBias.vintagePhoto}
                    alt="Vintage"
                    className="w-full h-full object-cover rounded-lg absolute opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                )}
                <div className="absolute bottom-2 right-2 bg-amber-900/80 text-white text-xs px-2 py-1 rounded">
                  {LABELS.photoPreviewHover}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Camera size={48} className="text-amber-600 mb-2" />
                <span className="text-amber-700">{LABELS.uploadPhoto}</span>
                <span className="text-amber-600 text-xs mt-2">{LABELS.autoVintage}</span>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={onPhotoUpload} />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-amber-900 font-semibold mb-2">{LABELS.name}</label>
            <input
              type="text"
              value={currentBias.name || ''}
              onChange={(e) => onFieldChange('name', e.target.value)}
              className={COMMON_CLASSES.input}
              placeholder={LABELS.namePlaceholder}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">{LABELS.startDate}</label>
              <input
                type="date"
                value={currentBias.startDate || ''}
                onChange={(e) => onFieldChange('startDate', e.target.value)}
                onClick={(e) => {
                  const input = e.currentTarget as HTMLInputElement;
                  if (input.showPicker) {
                    input.showPicker();
                  }
                }}
                className={COMMON_CLASSES.input}
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">{LABELS.endDate}</label>
              <input
                type="date"
                value={currentBias.endDate || ''}
                onChange={(e) => onFieldChange('endDate', e.target.value)}
                onClick={(e) => {
                  const input = e.currentTarget as HTMLInputElement;
                  if (input.showPicker) {
                    input.showPicker();
                  }
                }}
                className={COMMON_CLASSES.input}
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-900 font-semibold mb-2">{LABELS.reason}</label>
            <textarea
              value={currentBias.reason || ''}
              onChange={(e) => onFieldChange('reason', e.target.value)}
              className={`${COMMON_CLASSES.input} h-24`}
              placeholder={LABELS.reasonPlaceholder}
            />
          </div>

          <button
            onClick={onSubmit}
            className={`w-full ${COMMON_CLASSES.button.primary} flex items-center justify-center gap-2`}
          >
            <Plus size={20} />
            {LABELS.addBias}
          </button>
        </div>
      </div>
    </div>
  );
}
