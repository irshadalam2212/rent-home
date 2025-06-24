// UploadComponent.tsx
import React, { useEffect, useRef, useCallback } from "react";
import "./upload.css";

export interface UploadComponentProps {
  onChange: (file: File) => void;
  label?: string;
  accept?: string;
}

export const Upload: React.FC<UploadComponentProps> = ({
  onChange,
  label = "Drag and drop or click to upload",
  accept = "image/*",
}) => {
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const preventDefaults = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const highlight = useCallback(() => {
    if (dropAreaRef.current) {
      dropAreaRef.current.style.backgroundColor = "#e9e9e9";
      dropAreaRef.current.style.border = "2px dotted #999";
    }
  }, []);

  const unHighlight = useCallback(() => {
    if (dropAreaRef.current) {
      dropAreaRef.current.style.backgroundColor = "#f6f6f6";
      dropAreaRef.current.style.border = "unset";
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      const files = e.dataTransfer?.files;
      if (files?.[0]) {
        onChange(files[0]);
        previewImage(files[0]);
      }
    },
    [onChange]
  );

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = document.createElement("img");
      img.src = reader.result as string;
      img.className = "image-preview";
      dropAreaRef.current?.appendChild(img);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      previewImage(file);
    }
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const eventNames = ["dragenter", "dragover", "dragleave", "drop"] as const;

    eventNames.forEach(event =>
      dropArea.addEventListener(event, preventDefaults, false)
    );

    ["dragenter", "dragover"].forEach(event =>
      dropArea.addEventListener(event, highlight, false)
    );

    ["dragleave", "drop"].forEach(event =>
      dropArea.addEventListener(event, unHighlight, false)
    );

    dropArea.addEventListener("drop", handleDrop as EventListener, false);

    return () => {
      eventNames.forEach(event =>
        dropArea.removeEventListener(event, preventDefaults, false)
      );

      ["dragenter", "dragover"].forEach(event =>
        dropArea.removeEventListener(event, highlight, false)
      );

      ["dragleave", "drop"].forEach(event =>
        dropArea.removeEventListener(event, unHighlight, false)
      );

      dropArea.removeEventListener("drop", handleDrop as EventListener, false);
    };
  }, [preventDefaults, highlight, unHighlight, handleDrop]);

  return (
    <div id="drop-area" ref={dropAreaRef} className="mt-2" >
      <input
        type="file"
        id="fileElem"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label className="upload-label" htmlFor="fileElem">
        <div className="upload-text">{label}</div>
      </label>
      <div className="image" />
    </div>
  );
};
