type TitleProps = {
  children: string
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <h1 className="text-[64px] font-bold">{children}</h1>
)

export default Title
