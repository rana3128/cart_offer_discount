import react from "react";
import { Select, Row, Col, Button, Divider } from "antd";
import { DiscountType, PriceData } from "../configs/configs";
import { calculateDiscount } from "../utils/calDiscount";

const { Option } = Select;

export default class Cart extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDiscount: 0,
      cartItems: {},
      freeItems: {},
      cartTotal: 0,
      cartTotalDictount: 0,
    };
  }

  handleDiscount = (selectDiscount) => {
    console.log(selectDiscount);
    this.setState({ selectDiscount });
  };

  addItemToCart = (itemName) => {
    if(!this.checkSelectedAudinence()){
        alert("Pls select Audience");
        return;
    }
    let { cartItems, cartTotal, cartTotalDictount } = this.state;
    if (cartItems[itemName]) {
      cartItems[itemName].count = cartItems[itemName].count + 1;
      cartItems[itemName].total =
        cartItems[itemName].count * PriceData[itemName];
    } else {
      cartItems[itemName] = {};
      cartItems[itemName].count = 1;
      cartItems[itemName].total = (
        cartItems[itemName].count * PriceData[itemName]
      ).toFixed();
    }
    cartTotal = cartTotal + PriceData[itemName];
    const checkDeal = calculateDiscount(cartItems, this.state.selectDiscount);
    console.log(checkDeal);
    this.setState({
      cartItems,
      cartTotal,
      cartTotalDictount: checkDeal.total,
      freeItems: checkDeal.freeItems,
    });
  };

  removeItemToCart = (itemName) => {
    if(!this.checkSelectedAudinence()){
        alert("Pls select Audience");
        return;
    }
    let { cartItems, cartTotal, cartTotalDictount } = this.state;
    if (cartItems[itemName]) {
      cartItems[itemName].count = cartItems[itemName].count - 1;
      cartItems[itemName].total = (
        cartItems[itemName].count * PriceData[itemName]
      ).toFixed();
      if (cartItems[itemName].count <= 0) {
        delete cartItems[itemName];
      }
      cartTotal = cartTotal - PriceData[itemName];
      const checkDeal = calculateDiscount(cartItems, this.state.selectDiscount);
      console.log(checkDeal);
      this.setState({
        cartItems,
        cartTotal,
        cartTotalDictount: checkDeal.total,
        freeItems: checkDeal.freeItems,
      });
    }
  };

  checkSelectedAudinence = () =>{
      if(this.state.selectDiscount){
          return true;
      }
      return false;
  }

  render() {
    return (
      <div className="cartbox">
        <Select
          defaultValue={null}
          style={{ width: 200 }}
          onChange={this.handleDiscount}
        >
          <Option value={null}>---Select Audience---</Option>
          {DiscountType.map((discount) => (
            <Option value={discount.percentageDiscount}>
              {discount.title}
            </Option>
          ))}
        </Select>

        <br />
        <Row>
          <Col span={12}>
            <div className="itemsBox">
              Available Items (Add/remove to cart by +/-) <br />
              <br />
              {Object.keys(PriceData).map((itemName) => {
                return (
                  <div>
                    <Row>
                      <Col span={16}>{itemName}</Col>
                      <Col span={8}>
                        <Button
                          type="primary"
                          shape="circle"
                          onClick={() => this.addItemToCart(itemName)}
                        >
                          +
                        </Button>
                        {this.state.cartItems[itemName]
                          ? this.state.cartItems[itemName].count
                          : 0}
                        <Button
                          type="primary"
                          shape="circle"
                          onClick={() => this.removeItemToCart(itemName)}
                        >
                          -
                        </Button>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col span={12}>
            <div className="itemsBox">
              <Row>
                <Col span={12}>Added Items</Col>
                <Col span={12}>Amount</Col>
              </Row>
              <Divider />
              {Object.keys(this.state.cartItems).map((itemName) => {
                return (
                  <div>
                    <Row>
                      <Col span={16}>{itemName}</Col>
                      <Col span={8}>
                        {this.state.cartItems[itemName]
                          ? this.state.cartItems[itemName].total
                          : 0}
                      </Col>
                    </Row>
                  </div>
                );
              })}
              {Object.keys(this.state.freeItems).map((itemName) => {
                return (
                  <div>
                    <Row>
                      <Col span={16}>{itemName} ( Free )</Col>
                      <Col span={8}>
                        0
                      </Col>
                    </Row>
                  </div>
                );
              })}
              <Divider />
              <Row>
                <Col span={16}>Cart Total :</Col>{" "}
                <Col span={8}>{this.state.cartTotal.toFixed(2)}</Col>{" "}
              </Row>
              <Divider />
              <Row>
                <Col span={16}>Cart Total after discount : </Col>{" "}
                <Col span={8}>{this.state.cartTotalDictount.toFixed(2)}</Col>{" "}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
