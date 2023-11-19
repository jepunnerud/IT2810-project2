import { useQuery } from '@tanstack/react-query'

function fetchLetter(letter: string) {
  return useQuery({
    queryFn: async () => {
      const data = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
      ).then((res) => res.json())
      return data
    },
    queryKey: ['drinks'],
  })
}

console.log(fetchLetter('a'))

export default { fetchLetter }