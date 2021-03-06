import React, { useEffect } from "react";
import { Row, Col, Table, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { listProducts, removeProduct } from "../../actions/productActions";
import Paginate from "../Paginate";

const ProductsListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("", pageNumber));
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo, pageNumber]);

  const deleteProductHandler = (id) => {
    if (
      window.confirm(`Are you sure you want to delete this product ${id} ?`)
    ) {
      dispatch(removeProduct(id));
    }
  };

  return (
    <>
      <Row className="align-items-center my-3">
        <Col>
          <h3>PRODUCT LIST</h3>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/products/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Table striped hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <Image
                          src={product.image}
                          fluid
                          alt={product.name}
                          width="40"
                        />
                      </td>
                      <td>{product._id.toUpperCase()}</td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/products/${product._id}/edit`}
                        >
                          <Button variant="warning" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm ml-2"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductsListPage;
