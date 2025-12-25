
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center text-xs text-foreground/45">
          <span>© {currentYear} PromptLab. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
