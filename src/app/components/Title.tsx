interface Props {
  title: string,
  className?: string
}

const Title = (props: Props) => {
  return (
    <div className="text-white font-cabin text-[2.5rem] my-6 font-bold min-w-[315px]">{props.title}</div>
  )
}

export default Title;