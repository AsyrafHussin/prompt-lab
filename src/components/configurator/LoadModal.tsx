
import { Trash2, FolderOpen } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useConfigStore } from '../../store/configStore';
import { useUIStore } from '../../store/uiStore';
import { templateEngine } from '../../templates';

export function LoadModal() {
  const isLoadModalOpen = useUIStore((state) => state.isLoadModalOpen);
  const closeLoadModal = useUIStore((state) => state.closeLoadModal);
  const savedConfigs = useConfigStore((state) => state.savedConfigs);
  const loadConfiguration = useConfigStore((state) => state.loadConfiguration);
  const deleteConfiguration = useConfigStore((state) => state.deleteConfiguration);
  const addToast = useUIStore((state) => state.addToast);

  const handleLoad = (id: string, name: string) => {
    loadConfiguration(id);
    addToast(`Configuration "${name}" loaded successfully!`, 'success');
    closeLoadModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteConfiguration(id);
      addToast(`Configuration "${name}" deleted`, 'info');
    }
  };

  return (
    <Modal isOpen={isLoadModalOpen} onClose={closeLoadModal} title="Load Configuration" size="lg">
      <div className="space-y-4">
        {savedConfigs.length === 0 ? (
          <div className="text-center py-8 text-foreground/45">
            <FolderOpen size={48} className="mx-auto mb-3 opacity-50" />
            <p>No saved configurations yet</p>
            <p className="text-sm mt-1">Save a configuration to see it here</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
            {savedConfigs.map((config) => {
              const uiTypeConfig = templateEngine.getConfig(config.uiType);
              const IconComponent = Icons[uiTypeConfig.icon as keyof typeof Icons] as any;
              return (
                <div
                  key={config.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card-elevated border border-border hover:border-foreground/45 transition-[border-color] ease-out-quad duration-100 group"
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="text-foreground/70">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{config.name}</h4>
                    <p className="text-xs text-foreground/45">
                      {uiTypeConfig.label} •{' '}
                      {new Date(config.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoad(config.id, config.name)}
                      className="px-3 py-1.5 text-sm bg-card-elevated border border-border text-foreground rounded-lg hover:bg-card-muted transition-[background-color] ease-out-quad duration-100"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(config.id, config.name)}
                      className="p-1.5 text-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-[background-color,color] ease-out-quad duration-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
