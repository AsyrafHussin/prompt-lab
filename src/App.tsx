import { Layout } from './components/layout/Layout';
import { Configurator } from './components/configurator/Configurator';
import { PromptPreview } from './components/preview/PromptPreview';
import { SaveModal } from './components/configurator/SaveModal';
import { LoadModal } from './components/configurator/LoadModal';
import { ToastContainer } from './components/common/Toast';

function App() {
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {/* Left Panel - Configurator */}
        <div className="space-y-6">
          <Configurator />
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <PromptPreview />
        </div>
      </div>

      {/* Modals */}
      <SaveModal />
      <LoadModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </Layout>
  );
}

export default App;
