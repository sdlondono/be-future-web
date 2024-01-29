type SubTitleProps = {
  children: string
}

const SubTitle: React.FC<SubTitleProps> = ({ children }) => (
  <h2 className="text-[36px] text-[#38434D]">{children}</h2>
)

export default SubTitle
