
type LabelledTextProps = {
    icon: React.ReactNode;
    label: string;
    className?: string;
};

const LabelledText = ({ icon, label, className }: LabelledTextProps) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <span className="text-primary">{icon}</span>
            <span className="text-gray-600 text-sm">{label}</span>
        </div>
    )
}

export default LabelledText
