import Head from 'next/head'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { CheckCircleFill } from 'react-bootstrap-icons'

import liff from '@line/liff'

export default function Success () {

  const handleClick = () => {
    liff.closeWindow()
  }

  return (
    <section>
      <Head>
        <title> Login - Success </title>
      </Head>
      <Container fluid="md" className="mt-5 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col className="text-center">
            <CheckCircleFill color="green" size={96} />
            <h3>Thankyou</h3>
            <p>Login success</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Button block variant="success" type="button" onClick={handleClick}>
              Close
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}