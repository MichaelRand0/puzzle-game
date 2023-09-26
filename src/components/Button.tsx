
interface Props extends React.ComponentProps<"button"> {}

const Button = (props: Props) => {
  return (
    <button
      {...props}
      className={`
      bg-slate-600 text-white p-2 rounded mr-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity
      -50 ${props.className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
