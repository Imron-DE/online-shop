export default function Button({ buttonClassname, type, children, onClick = () => {} }) {
  return (
    <button onClick={onClick} type={type} className={`h-10 px-6 font-semibold ${buttonClassname}`}>
      {children}
    </button>
  );
}
