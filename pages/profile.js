import { useEffect, useState } from 'react'
import Head from 'next/head'
// import Image from 'next/image'
import { Container, Row, Col, ButtonGroup, Button, Image, Form, Alert, Modal } from 'react-bootstrap';
import { PersonPlusFill, Award, UpcScan } from 'react-bootstrap-icons';

// import Reward from './reward'
// import History from './history'
import HomeMedical from './homemed'
import Appointment from './appointment'

// import liff from '@line/liff'

export default function Register(props) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState('');
  const [code, setCode] = useState()
  // const [friendFlag, setFriendFlag] = useState()
  const [os, setOs] = useState('ios')
  const [page, setPage] = useState('homemed')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    // const liff = (await import('@line/liff')).default
    await liff.ready
    const checkOs = liff.getOS()
    setOs(checkOs)
    console.log(checkOs)
    // liff.getFriendship().then(data => {
    //   console.log('friendFlag: ', data)
    //   if (data.friendFlag) {
    //     setFriendFlag(data.friendFlag)
    //   }
    // });
  }, [])

  const scanCode = async () => {
    // await liff.ready
    const liff = (await import('@line/liff')).default
    // await liff.ready

    if (liff.isInClient() && liff.getOS() === "android") {
      const result = await liff.scanCode()
      // alert(JSON.stringify(result))
      setCode(result.value)
    } else {
      alert('Not support')
    }
  }

  const changePage = (page) => {
    setPage(page)
    console.log('page', page)
  }

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <Container fluid="md" className="m-2 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col className="text-center">
            <h4>My Profile</h4>
          </Col>
        </Row>
        <div className="profile-box">
          <Row className="justify-content-md-center mb-2">
            <Col xs={4} className="text-center">
              {props.profile.pictureUrl && <Image
                src={props.profile.pictureUrl}
                alt={props.profile.displayName}
                width={96}
                height={96}
                roundedCircle
              />}
              {/* <div className="mt-1 mb-1">
                <h5><Award size={24} />{' '} 5,000</h5>
              </div> */}
              <div>{props.profile.displayName}</div>
            {/* <div>{props.profile.userId}</div> */}
            </Col>
            <Col xs={8} className="text-left">
              <h5>{props.users.fullname}</h5>
              <div>{props.users.hn}</div>
              <div>{props.users.mobile}</div>
              <div className="mt-1">
                {/* {!friendFlag && <Button variant="success" size="sm">
                  <PersonPlusFill size={18} />{' '}Add Friend
                </Button>} */}
              </div>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-md-center mt-2">
          <Col className="text-center">
            <ButtonGroup className="d-flex" aria-label="First group">
              <Button variant="info" className="w-100" onClick={() => changePage('homemed')}>รายการยา</Button>
              <Button variant="info" className="w-100" onClick={() => changePage('appointment')}>วันนัด</Button>
              {/* <Button variant="info" className="w-100" onClick={() => changePage('collect')}>Collect Point</Button> */}
              
            </ButtonGroup>
          </Col>
        </Row>
        {page === 'homemed' && <Row className="justify-content-md-center mt-2">
          <Col xs={12} className="text-center">
            <HomeMedical users={props.users} />
          </Col>
        </Row>}

        {page === 'appointment' && <Row className="justify-content-md-center mt-2">
          <Col xs={12} className="text-center">
            <Appointment users={props.users} />
          </Col>
        </Row>}
      </Container>
      <style jsx>{`
        .profile-box {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 15px;
        }
      `}</style>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{info}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}