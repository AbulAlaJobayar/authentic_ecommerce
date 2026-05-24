const MetricCard = ({
    label,
    value,
    sub,
    valueClass = "",
}: {
    label: string;
    value: string | number;
    sub?: string;
    valueClass?: string;
}) => {
    return (
        <div className="bg-muted/50 rounded-xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-1">
                {label}
            </p>
            <p className={`text-2xl font-semibold leading-none ${valueClass}`}>
                {value}
            </p>
            {sub && (
                <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>
            )}
        </div>
    );
};

export default MetricCard;
