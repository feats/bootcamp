import useSWR from 'swr'
import styled from '@emotion/styled'
import { request } from 'graphql-request'

const BACKEND = 'http://localhost:4000'

const Outline = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`

const HelloBackend = () => {
  const { data, error } = useSWR(
    `{
      user(id: 1) {
        name
        id
        lists {
          name
          tasks {
            text
            completed
          }
        }
      }
    }`,
    query => request(BACKEND, query)
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      data coming from the <a href={BACKEND}>backend</a>:{' '}
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <Outline>
    <h1>Welcome to feat's bootcamp!</h1>
    <p>I hope Carlo is being nice with you... 😛</p>
    <hr />
    <HelloBackend />
  </Outline>
)
