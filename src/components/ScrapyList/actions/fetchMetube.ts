'use server'

const fetchMetube = async (title: string, url: string) => {
  const endpoint = process.env.METUBE_ENDPOINT
  if (!endpoint) {
    throw new Error('METUBE_ENDPOINT not defind')
  }
  const data = {
    custom_name_prefix: title,
    url,
    quality: 'best',
  }
  const response = await fetch(`${endpoint}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export default fetchMetube
