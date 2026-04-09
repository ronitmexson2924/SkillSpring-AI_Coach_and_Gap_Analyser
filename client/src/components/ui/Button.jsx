const variants = {
  primary:
    'bg-gradient-to-r from-brand-teal via-cyan-300 to-brand-indigo text-slate-950 shadow-teal hover:translate-y-[-1px]',
  secondary:
    'border border-white/10 bg-white/5 text-brand-text hover:border-brand-violet/70 hover:bg-white/10',
  ghost: 'text-brand-text hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm md:text-base',
  lg: 'px-6 py-3.5 text-base md:text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Comp = 'button',
  type,
  ...props
}) {
  return (
    <Comp
      type={Comp === 'button' ? (type ?? 'button') : type}
      className={`button-shimmer inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
