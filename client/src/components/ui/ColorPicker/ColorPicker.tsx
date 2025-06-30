// import { useState, useEffect, useRef } from "react";
// import { SketchPicker } from "react-color";

// export type ColorPickerProps = {
//   value: string;
//   onChange: (color: string) => void;
//   defaultValue?: string;
// };

// const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const pickerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
//         setShowPicker(false);
//       }
//     };

//     if (showPicker) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPicker]);

//   return (
//     <div className="bg-gray-100 px-3 py-3 rounded-xl relative">
//       {/* Clickable div to open color picker */}
//       <div
//         onClick={() => setShowPicker(!showPicker)}
//         style={{
//           width: "100%",
//           height: "25px",
//           background: value,
//           cursor: "pointer",
//         }}
//       />

//       {showPicker && (
//         <div ref={pickerRef} style={{ position: "absolute", zIndex: 2, left: -50 }}>
//           <SketchPicker
//             color={value}
//             onChange={(color) => onChange(color.hex)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;


import { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";

export type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
  defaultValue?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState<'left' | 'bottom' | 'right' | 'top'>('top');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const togglePicker = () => {
    setShowPicker((prev) => {
      if (!prev) {
        setTimeout(() => {
          adjustPickerPosition();
        }, 0);
      }
      return !prev;
    });
  };

  const adjustPickerPosition = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const space = {
      left: rect.left,
      right: window.innerWidth - rect.right,
      bottom: window.innerHeight - rect.bottom,
    };

    if (space.right > 250) setPosition('right');
    else if (space.bottom > 350) setPosition('bottom');
    else setPosition('left');
  };

  const getPickerStyle = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return { position: 'absolute', zIndex: 2, bottom: '100%', left: 0 };
      case 'bottom':
      default:
        return { position: 'absolute', zIndex: 2, top: '100%', left: 0 };
    }
  };

  return (
    <div
      className="bg-gray-100 px-3 py-3 rounded-xl relative inline-block w-full"
      ref={wrapperRef}
    >
      <div
        onClick={togglePicker}
        style={{
          width: "100%",
          height: "25px",
          background: value,
          cursor: "pointer",
        }}
      />

      {showPicker && (
        <div ref={pickerRef} style={getPickerStyle()}>
          <SketchPicker color={value} onChange={(color) => onChange(color.hex)} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
