import './App.css';
import { useState } from 'react';
import { Button, Col, Container, Carousel, Row, InputGroup, Form, FormControl, Image } from 'react-bootstrap';
import axios from 'axios';
function App() {

  const [idMedecine, setIdMedecine] = useState(1)
  const [medecine, setMedecine] = useState({})
  const [medecines, setMedecines] = useState([])
  const [formMedicament, setFormMedicament] = useState({});
  const [formMedicament1, setFormMedicament1] = useState({});
  const [formMedicament2, setFormMedicament2] = useState({});


  const [formCategorie, setFormCategorie] = useState({});
  const [formCategorie2, setFormCategorie2] = useState({});
  const [formCategorie1, setFormCategorie1] = useState({});
  const [idCategorie, setIdCategorie] = useState(1)
  const [categorie, setCategorie] = useState({})
  const [categories, setCategories] = useState([])

  function getDatas() {
    let url = `http://localhost:3010/medicine/${idMedecine}`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si le medo existe
      if (datas.length > 0) {
        setMedecine(datas[0])
      } else {
        setMedecine(datas)
      }

    })

  }

  function getAllMed() {
    let url = `http://localhost:3010/medicine`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si le medo existe
      if (datas.length > 0) {
        setMedecines(datas)
      }

    })

  }

  function getAllCategories() {
    let url = `http://localhost:3010/category`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Renvoyer toutes les categories
      setCategories(datas)

    })

  }

  function getCategorie() {
    let url = `http://localhost:3010/category/${idCategorie}`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si la categorie existe
      if (datas.length > 0) {
        setCategorie(datas[0])
      } else {
        setCategorie(datas)
      }

    })

  }



  function displayMedecines() {
    return medecines.map(m => {

      return (
        <Carousel.Item>
          <h4>Id medicament : {m.id_med}</h4>
          <h4>Titre : {m.title}</h4>
          <h4>ID categorie : {m.cat}</h4>
          <h4>Autorisation : {m.authorization_holder}</h4>
          <h4>CIS_code : {m.cis_code}</h4>
        </Carousel.Item>
      );
    });
  }

  function displayCategories() {
    return categories.map(c => {

      return (
        <Carousel.Item>
          <h4>ID categorie : {c.id_cat}</h4>
          <h4>Nom : {c.nom}</h4>
          <h4>CIS_code : {c.cis_code}</h4>
        </Carousel.Item>
      );
    });
  }

  


  function addCategorie(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/category/';
    const { id_cat, nom, cis_code } = { ...formCategorie }
    console.log(formCategorie);
    axios.post(url, {
      id_cat,
      nom,
      cis_code,
    });
  }

  function addMedicament(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/medicine';
    const { id_med,title , cat, authorization_holder, cis_code } = { ...formMedicament }
    console.log(formMedicament);
    axios.post(url, {
      id_med,
      title,
      cat,
      authorization_holder,
      cis_code,
    });
  }


  function deleteMedicament(event) {
    event.preventDefault();
    const { id_med } = { ...formMedicament1 }
    let url = 'http://localhost:3010/medicine/'+id_med;
    console.log(formMedicament1);
    axios.delete(url, {
      id_med,
    });
  }
  
  function deleteCategorie(event) {
    event.preventDefault();
    const { id_cat } = { ...formCategorie1 }
    let url = 'http://localhost:3010/category/'+id_cat;
    console.log(formCategorie1);
    axios.delete(url, {
      id_cat,
    });
  }

  function updateCategorie(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/category/';
    const { id_cat, nom, cis_code } = { ...formCategorie2 }
    console.log(formCategorie2);
    axios.put(url, {
      id_cat,
      nom,
      cis_code,
    });
  } 
  function updateMedicament(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/medicine/';
    const { id_med, cat } = { ...formMedicament2 }
    console.log(formMedicament2);
    axios.put(url, {
      id_med,
      cat,
    });
  } 


  return (
    <div className="App">

      <Container>
        <Row className='m-auto'>
          <Col className='mt-auto'>
            <h1>
              Afficher un/plusierus medicaments
            </h1>
            <hr />
            <InputGroup className="md-3">
              <FormControl
                placeholder="ID medicament..."
                onChange={(e) => { setIdMedecine(e.target.value) }}
              />
            </InputGroup>
            <Button className='m-5' variant='info' onClick={getDatas}>Afficher un medicament</Button>
            <Button variant="secondary" onClick={getAllMed} >Afficher tout les medicaments </Button>


          </Col>
          <Col className='mt-auto'>
            <h1>
              Afficher une/plusierus categories
            </h1>
            <hr />
            <InputGroup className="md-3">
              <FormControl
                placeholder="ID categorie..."
                onChange={(e) => { setIdCategorie(e.target.value) }}
              />
            </InputGroup>
            <Button className='m-5' variant='info' onClick={getCategorie}>Afficher une categorie </Button>
            <Button variant="secondary" onClick={getAllCategories} >Afficher toutes les categories </Button>
          </Col>
        </Row>

      </Container>
      <Container>
        <Row className='m-auto'>
          <Col className='mt-auto'>
            {

              <div>
                {'error' in medecine &&

                  <h4>
                    {medecine.error}
                  </h4>

                }
                <div>
                  {
                    'id_med' in medecine &&

                    <h4>
                      {medecine.id_med}
                      <br />
                      {medecine.cat}
                    </h4>
                  }
                </div>
              </div>


            }
          </Col>
          <Col className='mt-auto'>
            {

              <div>
                {'error' in categorie &&

                  <h4>
                    {categorie.error}
                  </h4>

                }
                <div>
                  {
                    'id_cat' in categorie &&

                    <h4>
                      {categorie.id_cat}
                      <br />
                      {categorie.nom}
                    </h4>
                  }
                </div>
              </div>


            }
          </Col>
        </Row>
      </Container>

      <Container className='mt-md-3 border border-primary rounded-3'>
        <Row>

          <Col>
            <Carousel className='mt-auto'>
              {displayMedecines()}
            </Carousel>
          </Col>

          <Col>
            <Carousel className='mt-auto'>
              {displayCategories()}
            </Carousel>
          </Col>
        </Row>
      </Container>

      <Container className='mt-md-3 border border-primary rounded-3'>
        <Row>
          <Col>
            <Form onSubmit={(e) => addMedicament(e)}>

              <Form.Group className="mb-3" >
                <Form.Label>ID Medicament</Form.Label>
                <Form.Control
                  value={formCategorie.id_med}
                  type="id" placeholder="Id Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.id_med = e.target.value;
                      setFormMedicament(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Nom medicament</Form.Label>
                <Form.Control
                  value={formCategorie.title}
                  type="nom" placeholder="Nom Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.title = e.target.value;
                      setFormMedicament(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Categorie du medicament</Form.Label>
                <Form.Control
                  value={formMedicament.cat}
                  type="cat"
                  placeholder="Categorie medicament..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.cat = e.target.value;
                      setFormMedicament(tmp)
                    }}
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Autorisation</Form.Label>
                <Form.Control
                  value={formCategorie.authorization_holder}
                  type="autorisation" placeholder="Autorisation Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.authorization_holder = e.target.value;
                      setFormMedicament(tmp)

                    }}
                  required />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>CIS code Medicament</Form.Label>
                <Form.Control
                  value={formCategorie.cis_code}
                  type="id" placeholder="CIS code Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.cis_code = e.target.value;
                      setFormMedicament(tmp)

                    }}
                  required />
              </Form.Group>

              <Button variant='info' type='submit'>Enregistrer</Button>
            </Form>
            
            <Form onSubmit={(e) => deleteMedicament(e)}>
              <Form.Group className="mb-3" >
              <Form.Control
                //value={...formAjout}
                  value={formMedicament.id_med}
                  type="id" placeholder="Id Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.id_med = e.target.value;
                      setFormMedicament1(tmp)

                    }}
                  required />
              </Form.Group>
              <Button variant='danger' type='submit'>Supprimer</Button>
            </Form>

            <Form onSubmit={(e) => updateMedicament(e)}>

              <Form.Group className="mb-3" >
                <Form.Label>ID Medicament</Form.Label>
                <Form.Control
                  value={formCategorie2.id_med}
                  type="id" placeholder="Id Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.id_med = e.target.value;
                      setFormMedicament2(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Nom medicament</Form.Label>
                <Form.Control
                  value={formCategorie2.title}
                  type="nom" placeholder="Nom Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament2 }
                      tmp.title = e.target.value;
                      setFormMedicament2(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Categorie du medicament</Form.Label>
                <Form.Control
                  value={formMedicament2.cat}
                  type="cat"
                  placeholder="Categorie medicament..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament2 }
                      tmp.cat = e.target.value;
                      setFormMedicament2(tmp)
                    }}
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Autorisation</Form.Label>
                <Form.Control
                  value={formCategorie2.authorization_holder}
                  type="autorisation" placeholder="Autorisation Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament2 }
                      tmp.authorization_holder = e.target.value;
                      setFormMedicament2(tmp)

                    }}
                  required />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>CIS code Medicament</Form.Label>
                <Form.Control
                  value={formCategorie2.cis_code}
                  type="id" placeholder="CIS code Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament2 }
                      tmp.cis_code = e.target.value;
                      setFormMedicament2(tmp)

                    }}
                  required />
              </Form.Group>

              <Button variant='warning' type='submit'>Modifier</Button>
            </Form>
            

          </Col>
          
          <Col>
            <Form onSubmit={(e) => addCategorie(e)}>
              <Form.Group className="mb-3" >
                <Form.Label>ID categorie</Form.Label>
                <Form.Control
                  //value={...formAjout}
                  value={formCategorie.id_cat}
                  type="id" placeholder="Id categorie..."
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie }
                      tmp.id_cat = e.target.value;
                      setFormCategorie(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Nom categorie</Form.Label>
                <Form.Control
                  value={formCategorie.nom}
                  type="nom"
                  placeholder="Nom Categorie..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie }
                      tmp.nom = e.target.value;
                      setFormCategorie(tmp)
                    }}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> cis_code categorie</Form.Label>
                <Form.Control
                  value={formCategorie.cis_code}
                  type="ciscategorie"
                  placeholder="Cis code Categorie..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie }
                      tmp.cis_code = e.target.value;
                      setFormCategorie(tmp)
                    }}
                />
              </Form.Group>

              <Button variant='info' type='submit'>Enregistrer</Button>
            </Form>
            <Form onSubmit={(e) => deleteCategorie(e)}>
              <Form.Group className="mb-3" >
                <Form.Control
                //value={...formAjout}
                  value={formCategorie1.id_cat}
                  type="id" placeholder="Id Categorie..."
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie1 }
                      tmp.id_cat = e.target.value;
                      setFormCategorie1(tmp)
                    }}
                  required />
              </Form.Group>
              <Button variant='danger' type='submit'>Supprimer</Button>
            </Form>
            <Form onSubmit={(e) => updateCategorie(e)}>
              <Form.Group className="mb-3" >
                <Form.Label>ID categorie</Form.Label>
                <Form.Control
                  //value={...formAjout}
                  value={formCategorie2.id_cat}
                  type="id" placeholder="Id categorie..."
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie2 }
                      tmp.id_cat = e.target.value;
                      setFormCategorie2(tmp)

                    }}
                    required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Nom categorie</Form.Label>
                <Form.Control
                  value={formCategorie2.nom}
                  type="nom"
                  placeholder="Nom Categorie..."
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie2 }
                      tmp.nom = e.target.value;
                      setFormCategorie2(tmp)
                    }}
                    required/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> cis_code categorie</Form.Label>
                <Form.Control
                  value={formCategorie2.cis_code}
                  type="ciscategorie"
                  placeholder="Cis code Categorie..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie2 }
                      tmp.cis_code = e.target.value;
                      setFormCategorie2(tmp)
                    }}
                />
              </Form.Group>

              <Button variant='warning' type='submit'>Modifier</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App;