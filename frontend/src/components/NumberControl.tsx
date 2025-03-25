import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberControlProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
}

export default function NumberControl({ label, value, onChange, min = 0 }: NumberControlProps) {
    const handleIncrement = () => onChange(value + 1);
    const handleDecrement = () => value > min && onChange(value - 1);

    return (
        <div className="flex items-center gap-2">
            <span className="font-medium">{label}</span>
            <Button variant="outline" size="icon" onClick={handleIncrement}>
                +
            </Button>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-16 text-center"
            />
            <Button variant="outline" size="icon" onClick={handleDecrement}>
                -
            </Button>
        </div>
    );
}
