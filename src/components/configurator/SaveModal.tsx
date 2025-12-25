
import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useConfigStore } from '../../store/configStore';
import { useUIStore } from '../../store/uiStore';

export function SaveModal() {
  const [name, setName] = useState('');
  const isSaveModalOpen = useUIStore((state) => state.isSaveModalOpen);
  const closeSaveModal = useUIStore((state) => state.closeSaveModal);
  const saveConfiguration = useConfigStore((state) => state.saveConfiguration);
  const addToast = useUIStore((state) => state.addToast);

  const handleSave = () => {
    if (!name.trim()) {
      addToast('Please enter a name for this configuration', 'error');
      return;
    }

    saveConfiguration(name);
    addToast(`Configuration "${name}" saved successfully!`, 'success');
    setName('');
    closeSaveModal();
  };

  const handleClose = () => {
    setName('');
    closeSaveModal();
  };

  return (
    <Modal
      isOpen={isSaveModalOpen}
      onClose={handleClose}
      title="Save Configuration"
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleClose} fullWidth>
            Cancel
          </Button>
          <Button onClick={handleSave} fullWidth>
            Save
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-foreground/70">
          Save your current configuration to load it later.
        </p>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Configuration Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., E-commerce Landing Page"
            className="w-full bg-card-elevated border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-foreground/45 hover:border-foreground/45 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none transition-[background-color,border-color,box-shadow] ease-out-quad duration-100"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
}
