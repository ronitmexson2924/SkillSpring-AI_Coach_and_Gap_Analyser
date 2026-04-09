export default function Card({ className = '', children, glow = false, ...props }) {
  return (
    <div
      className={`glass-card rounded-[28px] border border-brand-border/70 ${glow ? 'shadow-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

