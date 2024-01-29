type ButtonProps = {
  children: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#6366F1] text-white w-full rounded-[24px] justify-center h-9 text-[16px] font-semibold"
    type="submit"
  >
    {children}
  </button>
)

export default Button
