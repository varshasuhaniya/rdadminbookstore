import { useNavigate} from 'react-router-dom'
import {Button, Col, Container, Row,Form, Table} from 'react-bootstrap'
import {useEffect,useState} from 'react'
import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL

function DiscountList(){
    let [discounts,setDiscounts] = useState([])
    const navigate = useNavigate()
    function goToAddDiscount(){
        navigate('/add/discount')
    }
    function goForEdit(id){
        navigate('/edit/discount/' + id)
        //alert(id)
    }
   
    useEffect(()=>{
        axios({
            url:apiUrl + '/discounts',
            method:'get'
        }).then((res)=>{
           setDiscounts(res.data.data)
        }).catch((err)=>{
           alert(err)
        })

    },[])
    return(
<Container>
    <Row>
        <Col>
        <Form>
            <Form.Group>
                <Form.Control type="text" placeholder="type book name to search"></Form.Control>
            </Form.Group>
        </Form>
        <Button className="mt-5" variant="success" style={{float:'right'}} onClick={goToAddDiscount}>Add Discount</Button>
        </Col>
    </Row>
    <Row>
        <h3 className="mt-2 text-danger text-center">Discount List</h3>
        <Table bordered hover>
            <thead>
                <tr>
                    <th>Discount Name</th>
                    <th>Discount Type</th>
                    <th>Discount Value</th>
                    {/* <th>Book Name</th> */}
                    <th>ValidFrom</th>
                    <th>ValidTo</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    discounts.map((discount)=>
                        
                        <tr>
                            <td>{discount.discountName}</td>
                            <td>{discount.discountType}</td>
                            <td>{discount.discountValue}</td>
                            {/* <td>{discount.book.bookTittle}</td> */}
                            <td>{new Date(discount.validFrom).toLocaleDateString()}</td>
                            <td>{new Date(discount.validTo).toLocaleDateString()}</td>
                            <td style={{color:discount.status==="Active"?"green":"red"}}> {discount.status}</td>
                        <td><i class="bi bi-pencil text-success ms-3" onClick={()=> goForEdit(discount._id)}></i></td>
                        </tr>
                        
                    )
                }
            </tbody>

        </Table>
    </Row>
</Container>
    )
}
export default DiscountList