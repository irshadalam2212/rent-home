import { useState, useEffect } from "react";
import Input from "../Input";
import Tag from "../Tag/Tag";
import { HiX } from "react-icons/hi";

interface EmailTag {
    id: number;
    text: string;
}

interface EmailInputWithTagsProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

const EmailInputWithTags = ({ value, onChange, placeholder }: EmailInputWithTagsProps) => {
    const [tags, setTags] = useState<EmailTag[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<string>("")

    useEffect(() => {
        // Sync state with form value if changed externally
        setTags(value.map((email, index) => ({ id: index, text: email })));
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === " " || e.key === "," || e.key === "Enter") && inputValue.trim() !== "") {
            e.preventDefault();
            if (validateEmail(inputValue)) {
                const newTag = { id: Date.now(), text: inputValue.trim() };
                const updatedTags = [...tags, newTag];
                setTags(updatedTags);
                setInputValue("");
                setError("")
                onChange(updatedTags.map((tag) => tag.text));
            } else {
                setError("Invalid email address")
            }
        }
    };

    const handleBlur = () => {
        if (inputValue.trim() !== "") {
            if (validateEmail(inputValue)) {
                const newTag = { id: Date.now(), text: inputValue.trim() };
                const updatedTags = [...tags, newTag];
                setTags(updatedTags);
                setInputValue("");
                setError("");
                onChange(updatedTags.map((tag) => tag.text));
            } else {
                setError("Invalid email address");
            }
        } else {
            setError("");
        }
    };

    const removeTag = (id: number) => {
        const updatedTags = tags.filter((tag) => tag.id !== id);
        setTags(updatedTags);
        onChange(updatedTags.map((tag) => tag.text));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div>
            <Input
                type="email"
                autoComplete="off"
                placeholder={placeholder || "Enter email"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={error ? "bg-error-subtle" : ""}
            />
            {
                error && <p className="text-error mt-1 text-xs">{error}</p>
            }
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <div className=" rtl:ml-2">
                        <Tag suffix={
                            <HiX
                                className="ml-1 rtl:mr-1 cursor-pointer"
                                onClick={() => removeTag(tag?.id)}
                            />}>
                            {tag?.text}
                        </Tag>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default EmailInputWithTags;
