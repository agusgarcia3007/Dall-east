import Card from './Card'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) return data.map((post) => <Card key={post._id} {...post} />)

  return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
}

export default RenderCards
