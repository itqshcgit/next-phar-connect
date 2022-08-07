import { useEffect, useState } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Image, Form, Alert, Table } from 'react-bootstrap';

export default function homemed(props) {

  const [dataLoading, setdataLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(async () => {
    if (!dataLoading) {
      const res = await fetch('/api/LineUsers/HomeMedical/'+props.users.hn, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      const result = await res.json()
      if (result.status === 'success') {
        setData(result.data)
        setdataLoading(true)
      }
    }
  })

  return (
    <Container fluid className="m-0 p-0">
      <Row className="justify-content-md-center mb-2">
        <Col className="text-center">
          <h4>รายการยา</h4>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col className="text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Drug Name</th>
                <th>วิธีใช้</th>
                <th>ยา</th>
              </tr>
            </thead>
            <tbody>
            {dataLoading && data.map(function (d) {
              return (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.drugName}</td>
                  <td>{d.freeText2}</td>
                  <td>{d.drugIndication}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}