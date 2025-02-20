import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  language?: string
  lineNumber?: "off" | 'on'
  quickSuggestions?: boolean
}

const CodeEditor = (props: CodeEditorProps) => {
  const { theme } = useTheme();
  const [isAltPressed, setIsAltPressed] = React.useState(false);
  const [isShiftPressed, setIsShiftPressed] = React.useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.altKey) {
      setIsAltPressed(true);
    }
    if (event.shiftKey) {
      setIsShiftPressed(true);
    }
    if (isAltPressed && isShiftPressed && event.key === "F") {
      // format code
      event.preventDefault();
      const formatted = (await prettier.format(props.initialValue, { parser: "babel", plugins: [parser], useTabs: false, semi: true, singleQuote: true })).replace(/\n$/, "");
      props.onChange(formatted);
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    setIsAltPressed(false);
    setIsShiftPressed(false);
  }

  return (
    <div className="relative w-full h-full">
      <MonacoEditor
        value={props.initialValue}
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={props.language || "javascript"}
        options={{
          wordWrap: "off",
          minimap: { enabled: false },
          fontSize: 12,
          automaticLayout: true,
          lineNumbers: props.lineNumber || "on",
        }}
        onChange={value => props.onChange(value || "")}
      />
    </div>
  );
};

export default CodeEditor;