type CarSpecsGridProps = {
  specs: { label: string; value: string }[];
};

export function CarSpecsGrid({ specs }: CarSpecsGridProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {specs.map((s) => (
        <div key={s.label} className="rounded-xl border border-[#E5E7EB] bg-neutral-50 px-3 py-2.5">
          <p className="font-navbar text-xs text-[#5E5E5E]">{s.label}</p>
          <p className="mt-0.5 font-navbar text-sm font-bold text-[#1E1E1E]">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
