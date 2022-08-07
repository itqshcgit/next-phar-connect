import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import Head from 'next/head'
// import Image from 'next/image'

export default function Register(props) {
  const [warning, setwarning] = useState(false)
  const router = useRouter()
  const email = ''

  const handleClick = () => {
    // setUsers(true)
    router.push('/success')
  }

  const registerUser = async event => {
    event.preventDefault()
    // alert(event.target.name.value)
    const res = await fetch('/api/LineUsers/Register', {
      body: JSON.stringify({
        idCardNo: event.target.idCardNo.value,
        birthDate: event.target.birthDate.value,
        mobile: event.target.mobile.value,
        uid: props.profile.userId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    console.log('result', result)
    if(result.status === 'success'){
      router.push('/success')
    }else{
      setwarning(true)
    }
    // result.user => 'Ada Lovelace'
  }

  return (
    <section>
      <Head>
        <title>Register</title>
      </Head>
      <Container fluid="md" className="m-2 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col span={12} className="text-center">
            {warning && <Alert variant='danger'>
              Opp!!!, Something error.
            </Alert>}
            <h3>Register</h3>
            {/* {props.profile2.userId} */}
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col className="text-center">
            {props.profile.pictureUrl && <Image
              src={props.profile.pictureUrl}
              alt={props.profile.displayName}
              width={150}
              height={150}
              roundedCircle
            />}
            <div>{props.profile.displayName}</div>
            <div>{props.profile.userId}</div>
            <div>{props.email}</div>
            
            {/* <Image src={profile.pictureUrl} roundedCircle /> */}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form onSubmit={registerUser}>
              <Form.Group>
                <Form.Label>เลขที่บัตรประจำตัวประชาชน</Form.Label>
                <Form.Control id="name" name="idCardNo" type="text" placeholder="Enter Id Card Number" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>วันเกิด</Form.Label>
                <Form.Control id="email" name="birthDate" type="text" defaultValue={email} placeholder="Enter BirthDate" required />
              </Form.Group>

              <Form.Group>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control id="mobile" name="mobile" type="text" placeholder="Enter mobile phone number" required />
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" label="Accept Term & Condition" required />
              </Form.Group>
              <Button block variant="primary" type="submit">
                Register
              </Button>
              {/* <Button block variant="primary" type="button" onClick={handleClick}>
                Register
              </Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}