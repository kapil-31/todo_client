import { CardContainer } from '../styles/Card.styles'

export default function Table({ data }: { data: any[] }) {
  data = data.filter((item, index) => {
    if (item.notCompletedTaskCount === 0 || item.completedTaskCount === 0)
      return false

    return true
  })
  return (
    <div style={{ position: 'relative' }}>
      <CardContainer>
        <table>
          <tr>
            <th>Day</th>
            <th>Completion Rate</th>
          </tr>
          {!data.length ? (
            <tr>No task completed Yet</tr>
          ) : (
            data.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>
                    {(item.completedTaskCount / item.notCompletedTaskCount) *
                      100}
                    %
                  </td>
                </tr>
              )
            })
          )}
        </table>
      </CardContainer>
    </div>
  )
}
