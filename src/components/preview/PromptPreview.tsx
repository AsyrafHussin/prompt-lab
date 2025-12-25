
import { Card } from '../common/Card';
import { CopyButton } from './CopyButton';
import { ExportOptions } from './ExportOptions';
import { useConfigStore } from '../../store/configStore';
import { useEffect } from 'react';

export function PromptPreview() {
  const generatedPrompt = useConfigStore((state) => state.generatedPrompt);
  const generatePrompt = useConfigStore((state) => state.generatePrompt);

  // Generate initial prompt on mount
  useEffect(() => {
    generatePrompt();
  }, [generatePrompt]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Generated Prompt
        </h3>
        {generatedPrompt && (
          <div className="text-xs text-foreground/45">
            {generatedPrompt.length} characters
          </div>
        )}
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col" elevated highlight>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {generatedPrompt ? (
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {generatedPrompt}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-foreground/45">
              Configure your design to generate a prompt
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <CopyButton text={generatedPrompt} />
        <ExportOptions />
      </div>
    </div>
  );
}
