
import { RotateCcw, Save, FolderOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UITypeSelector } from './UITypeSelector';
import { ConfigForm } from './ConfigForm';
import { useConfigStore } from '../../store/configStore';
import { useUIStore } from '../../store/uiStore';
import { GlobalSettings } from './GlobalSettings';

export function Configurator() {
  const currentUIType = useConfigStore((state) => state.currentUIType);
  const resetConfig = useConfigStore((state) => state.resetConfig);
  const openSaveModal = useUIStore((state) => state.openSaveModal);
  const openLoadModal = useUIStore((state) => state.openLoadModal);

  const handleReset = () => {
    resetConfig(currentUIType);
  };

  return (
    <div className="space-y-6">
      <UITypeSelector />
      
      <GlobalSettings />

      <Card>
        <ConfigForm />
      </Card>

      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={handleReset} className="flex-1">
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>
        <Button variant="secondary" size="sm" onClick={openSaveModal} className="flex-1">
          <Save size={16} className="mr-2" />
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={openLoadModal} className="flex-1">
          <FolderOpen size={16} className="mr-2" />
          Load
        </Button>
      </div>
    </div>
  );
}
