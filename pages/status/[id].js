import DetailCards from '../../components/DetailCards'

export default function CardPage (props) {
  console.log('props', props)
  return (
    <>
      <DetailCards {...props} />
    </>
  )
}

export async function getServerSideProps (context) {
  const { params, res } = context
  const { id } = params
  const apiResponse = await fetch(`https://camus-nextjs.vercel.app/api/cards/${id}`)

  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(404).end()
  }
}
